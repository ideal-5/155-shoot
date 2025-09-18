<script setup lang='ts'>

</script>

<template>
  <div class="min-h100vh w100vw f-c flex-col">
    <NavBar>提示</NavBar>
    <image
      :src="`${IMAGE_BASE_URL}/icon/1.png`"
      class="mt20 size-16.75"
    />
    <div class="my3 text-4.5 fw500">
      正在生成中
    </div>
    <div class="mb10 text-3 text-gray">
      可在 我的-我的视频 查看
    </div>

    <wd-button custom-class="w35! h11! mb8!">
      我知道了
    </wd-button>
    <wd-button plain type="info" custom-class="w35! h11!">
      去查看
    </wd-button>
  </div>
</template>

<style scoped lang='scss'>

</style>
