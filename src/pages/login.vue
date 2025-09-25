<script setup lang='ts'>
import { getConfigAgreementApi, getLoginOpenIdApi, loginApi } from '@/api'

const toast = useToast()
const isAgree = ref(false)

const pageType = ref('')

onLoad(({ type }) => {
  pageType.value = type
})
function tapBack() {
  uni.navigateBack()
}

const openid = ref('')
onLoad(() => {
  getOpenId()
})

async function getOpenId() {
  const { code } = await uni.login()
  const { openid: a } = await getLoginOpenIdApi(code) as any
  openid.value = a
}

const userStore = useUserStore()
const { inviteCode } = storeToRefs(userStore)
async function tapLogin() {
  if (!isAgree.value) {
    toast.error('请先阅读并同意协议')
    return
  }
  if (!openid.value) {
    await getOpenId()
  }
  const { data: { token, userId } } = await loginApi(openid.value, inviteCode.value)
  userStore.setIdentityInfo({ userToken: token, userId })
  userStore.fetchUserInfo()
  inviteCode.value = ''
  uni.switchTab({ url: '/pages/home' })
}

/**
 * 协议
 */
const showProtocol = ref(false)
const protocol = ref<Awaited<ReturnType<typeof getConfigAgreementApi>>['data']>()

async function openProtocolPopup(params: Parameters<typeof getConfigAgreementApi>[0]) {
  const { data } = await getConfigAgreementApi(params)
  protocol.value = data
  showProtocol.value = true
}
</script>

<template>
  <div class="relative box-border h100vh w100vw f-c-c flex-col px7.5">
    <div class="w-27.5 overflow-hidden b-rd-2">
      <image :src="`${IMAGE_BASE_URL}/bg/26.png`" class="wf" mode="widthFix" />
    </div>
    <wd-button
      type="success"
      custom-class="bg-[linear-gradient(180deg,#1E88E5_0%,#80B7E7_100%)]!  wfull! h11! mt13.5 mb5.25"
      :disabled="!isAgree"
      @click="tapLogin"
    >
      微信登录
    </wd-button>
    <div class="f-c" @click="isAgree = !isAgree">
      <!-- <wd-checkbox v-model="isAgree" custom-shape-class="size-4! bg-transparent" /> -->
      <div
        class="mr1 box-border size-4 f-c-c b-(1 #677180 rd-full solid) transition-all"
        :class="[isAgree && 'bg-#1E88E5! b-#1E88E5!']"
      >
        <i v-if="isAgree" class="i-carbon:checkmark text-#fff" />
      </div>
      <div class="text-(3.5 #677180)">
        <span>我已认真阅读并同意</span>
        <span class="text-#1E88E5" @click.stop="openProtocolPopup({ type: '1' })">《用户协议》</span>
        <span>、</span>
        <span class="text-#1E88E5" @click.stop="openProtocolPopup({ type: '2' })">《隐私政策》</span>
      </div>
    </div>

    <wd-button v-if="pageType === 'showBack'" type="text" custom-class="mt10" @click="tapBack">
      取消登陆
    </wd-button>
    <image
      :src="`${IMAGE_BASE_URL}/bg/10.png`"
      class="absolute bottom-0 left-0 right-0 top-0 size-full -z-1"
    />
  </div>
  <!-- 协议弹窗 -->
  <wd-popup v-model="showProtocol" custom-class="bg-transparent!" closable>
    <div class="box-border w90vw b-rd-3 bg-#fff p3">
      <div class="mb2 wf f-c-c text-4 fw500">
        {{ protocol?.title }}
      </div>
      <div v-if="true" class="max-h-57vh min-h-20vh overflow-scroll">
        <mp-html :content="protocol?.content" />
      </div>
    </div>
  </wd-popup>
</template>

<style scoped lang='scss'>

</style>
