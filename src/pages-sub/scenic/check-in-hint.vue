<script setup lang='ts'>

</script>

<template>
  <div class="min-h100vh w100vw">
    <NavBar>提示</NavBar>

    <div class="mt24 wf f-c flex-col">
      <image
        :src="`${IMAGE_BASE_URL}/icon/42.png`"
        class="size-16.25"
      />
      <div class="mb3.25 mt2.75 text-(4.5 #111827)">
        打卡成功
      </div>
      <div class="mb12.25 text-(3 #A0AEC0)">
        可在 我的-我的足迹 查看
      </div>

      <wd-button custom-class="w44! h11! mb4.5 bg-#1E88E5 text-(3.75!) fw500!">
        我知道了
      </wd-button>
      <wd-button type="info" plain custom-class="w44! h11! text-(3.75! #111827!) fw500!">
        去查看
      </wd-button>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
