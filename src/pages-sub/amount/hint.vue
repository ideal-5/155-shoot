<script setup lang='ts'>
function tapGo() {
  uni.redirectTo({
    url: '/pages-sub/amount/withdrawal-details',
  })
}
</script>

<template>
  <div class="w100vw f-c flex-col">
    <NavBar>提示</NavBar>
    <image
      :src="`${IMAGE_BASE_URL}/icon/40.png`"
      class="mt24 size-16.25"
    />
    <div class="mb19.75 mt2.75 text-(4.5 #111827)">
      提现成功
    </div>

    <wd-button custom-class="w44! h11! bg-#1E88E5!" @click="tapGo">
      我知道了
    </wd-button>
  </div>
</template>

<style scoped lang='scss'>

</style>
