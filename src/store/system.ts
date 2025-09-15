import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export const useSystemStore = defineStore('system', () => {
  const state = reactive({
    SYSTEM: uni.getSystemInfoSync(), // 设备信息

    // #ifdef MP-WEIXIN
    MENU_BUTTON: undefined as ReturnType<typeof uni.getMenuButtonBoundingClientRect> | undefined, // 胶囊按钮位置信息
    // #endif

    statusBarHeight: 0, // 状态栏(时间栏)高度
    titleBarHeight: 0, // 标题栏高度
    navbarHeight: 0, // 导航栏总高度 = 标题栏高度 + 状态栏高度
    menuButtonWidth: 0, // 胶囊按钮的宽度 + 胶囊按钮与右边的距离
    menuButtonLeft: 0, // 胶囊按钮距离屏幕左边的距离 可以给navbar的titleBox宽度设置menuButtonLeft   确保标题绝对不会和胶囊按钮相交

    screenHeight: 0, // 屏幕高度

    safeAreaInsets: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }, // 四个方向的安全距离<px> {top,bottom,......}
    safeAreaInsetsRpx: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }, // 四个方向的安全距离<rpx> {top,bottom,......}
  })
  // px转rpx
  const pxToRpx = (px: number) => {
    const screenWidth = state.SYSTEM.screenWidth // 屏幕宽度
    return (750 * Number.parseInt(px.toString())) / screenWidth
  }

  // 获取当前设备的信息
  const initSetSystem = () => {
    const SYSTEM = uni.getSystemInfoSync()
    state.SYSTEM = SYSTEM
    state.screenHeight = SYSTEM.screenHeight

    // 状态栏高度
    state.statusBarHeight = SYSTEM.statusBarHeight || 0

    // 标题栏高度( 内容(胶囊) + 上下边距 )
    let titleTextHeight = 35 // 标题栏文字高度
    let titlePaddingHeight = 5 // 标题栏边距高度<这里是一个边距>

    // #ifdef MP-WEIXIN
    const MENU_BUTTON = uni.getMenuButtonBoundingClientRect()
    state.MENU_BUTTON = MENU_BUTTON
    const { top, height } = MENU_BUTTON // top 胶囊按钮top与顶部的距离
    titleTextHeight = height // 小程序中文字高度等于胶囊按钮高度
    titlePaddingHeight = top - state.statusBarHeight // 小程序中边距等于胶囊按钮距离顶部距离 - 状态栏高度
    state.menuButtonWidth = SYSTEM.screenWidth - MENU_BUTTON.left
    state.menuButtonLeft = MENU_BUTTON.left
    // #endif

    state.titleBarHeight = titleTextHeight + titlePaddingHeight * 2 // top - statusBarHeight： 上边距<胶囊按钮的高度加  2个胶囊按钮的上边距>
    state.navbarHeight = state.titleBarHeight + state.statusBarHeight // navBar的总高度
    state.safeAreaInsets = SYSTEM.safeAreaInsets
    // 获取四个方向的安全距离 并转为rpx
    state.safeAreaInsetsRpx = {
      top: pxToRpx(state.safeAreaInsets.top),
      bottom: pxToRpx(state.safeAreaInsets.bottom),
      left: pxToRpx(state.safeAreaInsets.left),
      right: pxToRpx(state.safeAreaInsets.right),
    }
  }

  return {
    initSetSystem,
    pxToRpx,
    ...toRefs(state), // 保证使用 storeToRefs 时响应式不丢失
  }
})
