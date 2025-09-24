<!-- z-paging自定义的下拉刷新view -->

<script setup lang="ts">
const props = defineProps<{ status: string, className?: string }>()

const text = computed(() => {
  // 这里可以做i18n国际化相关操作，可以通过uni.getLocale()获取当前语言(具体操作见i18n-demo.vue);
  // 获取到当前语言之后，就可以自定义不同语言下的展示内容了
  const statusTextMap = {
    'default': '继续下拉',
    'release-to-refresh': '松手刷新~~',
    'loading': '正在努力刷新中...',
    'complete': '刷新成功啦~',
  }
  return statusTextMap[props.status]
})
</script>

<template>
  <div class="refresher-container" :class="[props.className || '']">
    <!-- 这里的图片请换成自己项目的图片 -->
    <!-- <image class="refresher-image" mode="aspectFit" src="https://picsum.photos/200"></image> -->
    <i class="i-svg-spinners:blocks-shuffle-3" />
    <span class="refresher-text">{{ text }}</span>
  </div>
</template>

<style scoped>
.refresher-container {
  /* #ifndef APP-NVUE */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* #endif */
  height: 150rpx;
}

.refresher-image {
  width: 45px;
  height: 45px;
  margin-top: 10rpx;
}

.refresher-text {
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #666666;
}
</style>
