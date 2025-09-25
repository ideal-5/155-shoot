<script setup lang='ts'>
const { SYSTEM } = storeToRefs(useSystemStore())

const toast = useToast()

const part = ref(SYSTEM.value.windowWidth / 10) // 可用屏幕宽度的1/10

const imgList = ref([
  { img: 'https://picsum.photos/200/300', text: '原片', isFollow: false },
  { img: 'https://picsum.photos/200/300', text: '美颜', isFollow: false },
])

const existFollow = computed(() => imgList.value.some(item => item.isFollow))

onMounted(() => {
  const instance = getCurrentInstance().proxy
  const eventChannel = (instance as any).getOpenerEventChannel()
  eventChannel.on('sendData', (data: [string, string]) => {
    imgList.value[0].img = data[0]
    imgList.value[1].img = data[1]
  })
})

const showOverlay = ref(false)

const message = useMessage()
async function tapBtn() {
  const item = imgList.value.find(item => item.isFollow)
  if (!item) {
    try {
      await message
        .confirm({
          msg: '离开页面后图片将被销毁! ',
          // title: '确认注销账号嘛？',
          confirmButtonText: '知道了',
          cancelButtonText: '取消',
        })
      uni.navigateBack()
    }
    catch (error) {
      return
    }
    return
  }
  try {
    showOverlay.value = true
    const { path } = await uni.getImageInfo({ src: item.img })
    await uni.saveImageToPhotosAlbum({ filePath: path })
    showOverlay.value = false
    item.isFollow = false
    toast.success('保存成功')
  }
  catch (error) {
    showOverlay.value = false
    toast.error('保存失败，请稍后再试')
  }
}
</script>

<template>
  <wd-overlay :show="showOverlay" :z-index="20">
    <div class="size-full f-c-c">
      <div class="glass-16 box-border w50vw f-c-c flex-col b-rd-2 py10 text-#fff">
        <i class="i-svg-spinners:90-ring-with-bg mb3 text-5 fw900" />
        <div class="text-3.5">
          保存图片中，请稍后...
        </div>
      </div>
    </div>
  </wd-overlay>

  <div class="min-h100vh w100vw bg-#F2F3F7">
    <NavBar bar-color="#fff">
      旅游攻略
    </NavBar>
    <div class="grid grid-cols-2 mb20 mt5 box-border wf gap-x-3.75 px3.5">
      <template v-for="(item, ind) in imgList" :key="ind">
        <Follow :mask-opacity="0.7" :z-index="10" @tap-mask="item.isFollow = false">
          <FollowDiv
            v-model:is-follow="item.isFollow"
            :distance="{ top: 100, left: part }"
          >
            <div
              class="relative wf overflow-hidden b-rd-2.5 transition-all origin-c!"
              :style="{ width: item.isFollow ? `${part * 8}px` : '100%' }"
              @click="item.isFollow = true"
            >
              <div class="absolute left-0 top-0 z2 box-border f-c-c b-rd-br-2.25 bg-#000000/50 px1.5 py0.5 text-(3.5 #fff) fw500">
                {{ item.text }}
              </div>
              <WImage
                loading-class="h50!"
                custom-class="wf! overflow-hidden! b-rd-2.5!"
                mode="widthFix"
                :src="item.img"
                :show-menu-by-longpress="item.isFollow"
              />
            </div>
          </FollowDiv>
        </Follow>
      </template>
    </div>

    <div class="relative z11 box-border wf px8.75">
      <wd-button custom-class="bg-[linear-gradient(156deg,#AFA3F8_0%,#777BF6_100%)]! wf! h11.25! text-(4.75!) fw500!" @click="tapBtn">
        {{ existFollow ? '保存图片' : '重新生成' }}
      </wd-button>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
