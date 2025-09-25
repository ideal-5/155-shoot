<script setup lang="ts">
import { getConfigAgreementApi, postConfigLogoutApi } from '@/api'

const userStore = useUserStore()
const { hasLogin } = storeToRefs(userStore)

async function openProtocolPopup(params: Parameters<typeof getConfigAgreementApi>[0]) {
  const { data } = await getConfigAgreementApi(params)
  uni.navigateTo({
    url: '/pages-sub/settings/html-page',
    success(res) {
      res.eventChannel.emit('sendData', { title: data.title, content: data.content })
    },
  })
}
const message = useMessage()
const toast = useToast()
async function cancelUser() {
  try {
    await message
      .confirm({
        msg: '账号注销后所有数据将立即清空，包括余额等数据，请谨慎操作',
        title: '确认注销账号嘛？',
        confirmButtonText: '确认注销',
        cancelButtonText: '取消',
      })
  }
  catch (error) {
    return
  }
  try {
    const { msg, code } = await postConfigLogoutApi()
    toast[code === 1 ? 'success' : 'error'](msg)
    if (code === 1) {
      userStore.clearUserInfo()
      uni.reLaunch({
        url: '/pages/login',
      })
    }
  }
  catch (error) {

  }
}
</script>

<template>
  <div class="h100vh w100vw bg-#F7F7F7">
    <NavBar bar-color="#fff">
      设置中心
    </NavBar>
    <div class="mt2 box-border wf bg-#fff px3.75">
      <div
        class="box-border wf f-c justify-between b-b-(1 #F7F7F7 solid) py3 text-(3.75 #111827) fw500"
        @click.stop="openProtocolPopup({ type: '1' })"
      >
        <div>用户协议</div>
        <i class="i-line-md:chevron-small-right" />
      </div>
      <div
        class="box-border wf f-c justify-between b-b-(1 #F7F7F7 solid) py3 text-(3.75 #111827) fw500"
        @click.stop="openProtocolPopup({ type: '2' })"
      >
        <div>隐私政策</div>
        <i class="i-line-md:chevron-small-right" />
      </div>

      <div
        v-if="hasLogin"
        class="box-border wf f-c justify-between py3 text-(3.75 #111827) fw500"
        @click="cancelUser"
      >
        <div>注销账号</div>
        <i class="i-line-md:chevron-small-right" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
