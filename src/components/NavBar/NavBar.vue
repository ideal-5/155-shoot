<script setup lang="ts">
import { computed, defineProps, useSlots } from 'vue'

interface Props {
  barColor?: string
  isEmptyFill?: boolean
  isTimeFill?: boolean
  backColor?: string
  navbarBjClass?: string
  scrollTop?: number
  scrollLimit?: number | string
  scrollText?: boolean
  isStopBack?: boolean
  isBackIconFill?: boolean
  isShowBackIcon?: boolean
  zIndex?: number
}
const props = withDefaults(defineProps<Props>(), {
  barColor: 'transparent',
  // 是否需要取消填充
  isEmptyFill: false,
  // 是否只需要状态栏<时间>填充
  isTimeFill: false,
  // 返回按钮颜色
  backColor: '#000',
  // 背景的元素的class
  navbarBjClass: '',
  // 滚动条距离顶部的距离<如果不传 默认是-1  如果值是-1 就说明没有传值>
  //     import { onPageScroll } from "@dcloudio/uni-app";
  // const scrollTop = ref(0);
  // onPageScroll((e) => {
  //     scrollTop.value = e.scrollTop;
  // });
  scrollTop: -1,
  // 页面滚动多少时透明度为1  数字单位px  可传 1rxp 1px 1
  scrollLimit: 0,
  // 是否根据滚动改变文字透明度<默认和left插槽都会生效>
  scrollText: false,
  // 点击返回按钮是否阻止返回上一页面
  isStopBack: false,
  // 使用left具名插槽时 返回按钮是否占据位置
  isBackIconFill: false,
  // 是否强制显示返回按钮
  isShowBackIcon: false,
  zIndex: 10,
})
const emit = defineEmits<{
  tapBackIcon: []
}>()

const slots = useSlots()

const systemStore = useSystemStore()
const { navbarHeight, statusBarHeight, titleBarHeight, menuButtonWidth } = storeToRefs(systemStore)

function goBacksPage() {
  emit('tapBackIcon')
  if (!props.isStopBack) {
    uni.navigateBack({
      delta: 1,
    })
  }
}
function isGoBack() {
  const pages = getCurrentPages()
  // 如果页面栈长度大于1，表示有上一页可以返回
  // console.log("页面栈", pages);
  return pages.length > 1
}

/**
 * 背景色
 */

// 计算背景颜色
const background = computed(() => {
  let color = props.barColor
  if (props.scrollTop >= 0 && color === 'transparent') {
    color = '#fff' // 透明背景时替换成白色
  }
  return color
})
const scrollLimitExtra = computed(() => {
  const match = props.scrollLimit.toString().match(/^(\d+)(rpx|px)?$/)
  if (!match)
    return 0

  const count = Number(match[1])
  if (count <= 0)
    return 0

  return match[2] === 'rpx' ? uni.upx2px(count) : count
})

// 计算透明度，避免每次通过 computed 计算
const opacity = computed(() => {
  return props.scrollTop >= 0
    ? Math.min(props.scrollTop / (navbarHeight.value + scrollLimitExtra.value), 1)
    : 1
})
</script>

<template>
  <div class="layout" :style="{ zIndex: props.zIndex }">
    <div class="navbar">
      <!-- 背景 -->
      <div class="navbar-bj" :class="navbarBjClass" :style="{ opacity, background }" />

      <!-- 状态栏<时间> -->
      <div class="statusBar" :style="{ height: `${statusBarHeight}px` }" />

      <!-- 标题栏<标题> -->
      <div v-if="!props.isTimeFill" class="titleBar" :style="{ height: `${titleBarHeight}px` }">
        <!-- 返回按钮   -->
        <div
          v-if="isGoBack() || isShowBackIcon"
          class="back-icon"
          :style="{
            position: props.isBackIconFill ? 'initial' : 'absolute',
          }"
          @click="goBacksPage"
        >
          <div class="i-carbon:chevron-left aspect-1/1 scale-180" :style="{ color: props.backColor }" />
        </div>
        <div
          v-if="slots.default"
          :style="{ width: `${menuButtonWidth}px` }"
          class="hfull flex-shrink-0"
        />

        <div
          class="hfull min-w0 flex-1"
          :class="slots.default && `text-4.75  flex items-center  justify-center`"
          :style="{ opacity: scrollText ? opacity : 1 }"
        >
          <!-- 默认插槽给他加一个超出省略号的样式 -->
          <div class="wfull truncate text-center">
            <slot />
          </div>
          <slot name="left" />
        </div>

        <div :style="{ width: `${menuButtonWidth}px` }" class="hfull flex-shrink-0" />
      </div>
    </div>
    <!-- 填充 为了占位置 -->
    <div
      v-if="!props.isEmptyFill"
      class="fill"
      :style="{
        height: `${props.isTimeFill ? statusBarHeight : navbarHeight}px`,
      }"
    />
  </div>
</template>

<style scoped lang="scss">
.layout {
  --my-navbar-border-bottom-color: transparent; // 底部边框颜色
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100vw;

    .navbar-bj {
      position: absolute;
      width: 100%;
      height: 100%;
      border-bottom: 1rpx solid var(--my-navbar-border-bottom-color);
    }
    .back-icon {
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70rpx;
    }

    // .statusBar {
    // }
    .titleBar {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
    }
  }
  //   .fill {
  //   }
}
</style>
