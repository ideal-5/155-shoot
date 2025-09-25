<script setup lang='ts'>
import { putUserInfoApi } from '@/api'

const { bottomStyle } = useStyle().absoluteBottom(120)

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const from = ref<Parameters<typeof putUserInfoApi>[0]>({
  nickname: '',
  img: '',
  tel: '',
})

async function synchronizationInfo() {
  await userStore.fetchUserInfo()
  from.value = {
    nickname: userInfo.value.nickname,
    img: userInfo.value.img,
    tel: userInfo.value.tel,
  }
}

onLoad(() => {
  synchronizationInfo()
})

const { uploadImgs } = useUploadImg()
const toast = useToast()
function chooseAvatar({ detail: { avatarUrl } }: { detail: { avatarUrl: string } }) {
  console.log('avatarUrl', avatarUrl)
  if (!avatarUrl) {
    return
  }
  uni.navigateTo({
    url: '/pages-sub/settings/img-cropper',
    events: {
      onConfirm: async (afterData: any) => {
        console.log('afterData', afterData)
        try {
          const res = await uploadImgs([afterData.tempFilePath])
          from.value.img = res[0].url
        }
        catch (error) {
          toast.error('图片上传失败')
        }
      },
      onErr(data: any) {
        toast.error(data)
      },
    },
    success(res) {
      res.eventChannel.emit('receiveParams', { imageUrl: avatarUrl })
    },
  })
}

async function saveInfo() {
  const { code, msg } = await putUserInfoApi(from.value)
  toast[code === 1 ? 'success' : 'error'](msg)
  if (code === 1) {
    await userStore.fetchUserInfo()
    setTimeout(() => {
      uni.navigateBack()
    }, 500)
  }
}
</script>

<template>
  <div class="box-border min-h-100vh w100vw bg-#F6F7F9 px3.75">
    <NavBar bar-color="#fff">
      个人资料
    </NavBar>

    <button class="mt3.75! wf! f-c! flex-col!" open-type="chooseAvatar" @chooseavatar="chooseAvatar">
      <div class="relative size-18.75">
        <WImage :src="from.img" custom-class="size-full!  b-rd-full! overflow-hidden!" />
        <image
          :src="`${IMAGE_BASE_URL}/icon/51.png`"
          class="absolute bottom-0 right-1 size-4.25"
        />
      </div>

      <div class="my5 text-(3 #A0AEC0)">
        点击更换头像
      </div>
    </button>

    <div class="box-border wf flex b-rd-2.5 bg-#fff px4 py5">
      <div class="mr2 w-fit flex-shrink-0">
        用户昵称
      </div>
      <div class="min-w-0 flex-1 bg-#1E88E5">
        <wd-input
          v-model="from.nickname"
          no-border
          placeholder="请输入用户名"
          custom-input-class="text-right!"
          type="nickname"
        />
      </div>
    </div>

    <div class="mt5 box-border wf flex b-rd-2.5 bg-#fff px4 py5">
      <div class="mr2 w-fit flex-shrink-0">
        手机号
      </div>
      <div class="min-w-0 flex-1 bg-#1E88E5">
        <wd-input
          v-model="from.tel"
          no-border
          placeholder="请输入电话号"
          custom-input-class="text-right!"
          type="number"
          :maxlength="11"
        />
      </div>
    </div>

    <div class="box-border f-c-c px3.75" :style="bottomStyle">
      <wd-button custom-class="bg-#1E88E5! wf! h11.75!" @click="saveInfo">
        保存
      </wd-button>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
