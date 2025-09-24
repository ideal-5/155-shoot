<script setup lang='ts'>
import type { User } from '@/api'
import { getUserScenicApplyDetailApi, userScenicApplyApi } from '@/api'

const { bottomStyle, bottomHeightNum } = useStyle().absoluteBottom(120)
const toast = useToast()

const activeAddress = ref<[string, string]>(['', ''])

const from = ref<User.UserScenicApplyParams>({
  name: '',
  tel: '',
  cityCode: '',
  title: '',
  img: '',
})

const cityStore = useCityStore()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const isApply = computed(() => userInfo.value?.business_apply === 1)
async function addressChange(e: { detail: { value: string[] } }) {
  const locationRes = await cityStore.getLocation(e.detail.value.join(''))
  const res = await cityStore.getCityText(locationRes)
  activeAddress.value = [res.result.address_component.province, res.result.address_component.city]
  from.value.cityCode = res.result.ad_info.city_code
}

const imgList = computed(() => from.value.img.split(',').filter(Boolean))

const { selectImage, uploadImgs } = useUploadImg()
async function tapUpload() {
  try {
    const count = 6 - imgList.value.length
    const imgs = await selectImage(count)
    const res = await uploadImgs(imgs.tempFiles.map(item => item.tempFilePath))
    from.value.img = [...imgList.value, ...res.map(i => i.url)].filter(Boolean).join(',')
  }
  catch (error) {
    console.log('error', error)
    toast.error('图片上传失败')
  }
}

function deleteImage(index: number) {
  from.value.img = from.value.img
    .split(',')
    .filter(Boolean)
    .filter((_, i) => i !== index)
    .join(',')
}

async function tapApply() {
  console.log('from.value', from.value)
  if (!Object.values(from.value).every(val => !!val)) {
    toast.warning('请填写完整信息')
    return
  }
  const { code, msg } = await userScenicApplyApi(from.value)
  toast[code === 1 ? 'success' : 'error'](msg)
  if (code === 1) {
    userStore.fetchUserInfo()
  }
}

const detail = ref<Awaited<ReturnType<typeof getUserScenicApplyDetailApi>>['data']>()
async function getApplyDetail() {
  const { data } = await getUserScenicApplyDetailApi()
  detail.value = data
}

watch(() => isApply.value, (nVal) => {
  if (nVal === true) {
    getApplyDetail()
  }
}, { immediate: true })

const scrollTop = ref(0)
onPageScroll((e) => {
  scrollTop.value = e.scrollTop
})
</script>

<template>
  <div class="min-h-100vh w100vw bg-#F7F7F7" :style="{ paddingBottom: `${bottomHeightNum + 10}px` }">
    <NavBar bar-color="#56BEBA" :scroll-top="scrollTop" is-empty-fill class-name="text-#fff">
      景区入驻
    </NavBar>

    <image
      :src="`${IMAGE_BASE_URL}/bg/22.png`"
      class="relative z1 wf"
      mode="widthFix"
    />

    <div class="box-border wf px3.75 -mt7.75">
      <template v-if="isApply">
        <div class="relative z2 wf b-rd-3 bg-#fff">
          <div class="box-border wf f-c-c py12.5">
            <image
              :src="`${IMAGE_BASE_URL}/bg/1.png`"
              mode="widthFix"
              class="w25"
            />
          </div>

          <div class="wf f-c-c text-(4.25 #17191F) fw500">
            您的申请已提交，请保持手机通畅
          </div>

          <div class="box-border wf px3.75">
            <div class="mt8.75 h0.25 bg-#F7F8FA" />

            <div class="box-border wf py2">
              申请时间：{{ detail?.create_time }}
            </div>
            <div class="box-border wf py2">
              联系人：{{ detail?.name }}
            </div>
            <div class="box-border wf py2">
              联系电话：{{ detail?.tel }}
            </div>
            <div class="box-border wf py2">
              景区名称：{{ detail?.title }}
            </div>
            <div class="box-border wf py2">
              当前城市：{{ detail?.cityName }}
            </div>

            <div class="box-border wf py2">
              <div>
                景区资质：
              </div>
              <template
                v-for="(url, ind) in detail?.img.split(',')"
                :key="ind"
              >
                <WImage
                  custom-class="wf mt2.5 b-rd-1.5! overflow-hidden!"
                  mode="widthFix"
                  :src="url"
                  enable-preview
                />
              </template>
            </div>
          </div>

          <div :style="bottomStyle" class="box-border wf f-c-c bg-#F7F7F7 px9.5">
            <wd-button custom-class="wf! h11.25! bg-#1E88E5!">
              我知道了
            </wd-button>
          </div>
        </div>
      </template>

      <template v-if="!isApply">
        <div class="relative z2 box-border wf b-rd-3 bg-#fff">
          <Follow>
            <div class="box-border wf b-rd-2 bg-#fff px5.75 py3">
              <div class="mb3 text-(3.75 #111827) fw500">
                请填写您的姓名
              </div>
              <FollowInput
                v-model="from.name"
                placeholder="请填写您的姓名"
                no-border
                custom-class="b-(solid! 1! #D9D9D9!) h10! b-rd-1! box-border! px4.75! f-c!"
              />
            </div>
          </Follow>
          <Follow>
            <div class="box-border wf b-rd-2 bg-#fff px5.75 py3">
              <div class="mb3 text-(3.75 #111827) fw500">
                请填写您的联系电话
              </div>
              <FollowInput
                v-model="from.tel"
                no-border
                :maxlength="11"
                placeholder="请填写您的联系电话"
                custom-class="b-(solid! 1! #D9D9D9!) h10! b-rd-1! box-border! px4.75! f-c!"
              />
            </div>
          </Follow>
          <div class="box-border wf b-rd-2 bg-#fff px5.75 py3">
            <div class="mb3 text-(3.75 #111827) fw500">
              请选择你当前所在的城市
            </div>

            <picker
              mode="region"
              level="city"
              :value="activeAddress"
              class="grid grid-cols-1 wf"
              @change="addressChange"
            >
              <div class="box-border wf f-c justify-between px4.75 h10! b-(1! #D9D9D9! rd-1! solid!)">
                <div class="text-3">
                  {{ activeAddress[1] }}
                </div>
                <i class="i-line-md:chevron-small-down text-(6 #A0AEC0)" />
              </div>
            </picker>
          </div>

          <Follow>
            <div class="box-border wf b-rd-2 bg-#fff px5.75 py3">
              <div class="mb3 text-(3.75 #111827) fw500">
                景区名称
              </div>
              <FollowInput
                v-model="from.title"
                no-border
                placeholder="请填写景区名称"
                custom-class="b-(solid! 1! #D9D9D9!) h10! b-rd-1! box-border! px4.75! f-c!"
              />
            </div>
          </Follow>

          <div class="box-border wf b-rd-2 bg-#fff px5.75 py3">
            <div class="mb3 text-(3.75 #111827) fw500">
              景区资质
            </div>

            <div v-for="(url, ind) in imgList" :key="ind" class="relative mt3 box-border wf fw500">
              <div class="absolute right-0 top-0 z10 size-7 f-c-c b-rd-bl-1 bg-#000/50 text-#fff" @click="deleteImage(ind)">
                <i class="i-carbon:close-large" />
              </div>
              <WImage :src="url" mode="widthFix" custom-class="wf! overflow-hidden! b-rd-1!" />
            </div>

            <div v-if="imgList.length < 6" class="mt6 box-border wf f-c-c flex-col b-rd-1 bg-#F2F3F7 py5 text-#A0AEC0 fw500" @click="tapUpload">
              <i class="i-line-md:plus text-7" />
              <div class="mt1.75 text-3">
                点击上传资质
              </div>
            </div>
          </div>
        </div>

        <div :style="bottomStyle" class="box-border wf f-c-c bg-#F7F7F7 px9.5">
          <wd-button custom-class="wf! h11.25! bg-#1E88E5!" @click="tapApply">
            申请成为推广员
          </wd-button>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
