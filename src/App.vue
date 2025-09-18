<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { navigateToInterceptor } from '@/router/interceptor'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'

const systemStore = useSystemStore()
// const userStore = useUserStore()

onLaunch((options) => {
  systemStore.initSetSystem()
  // userStore.refreshUserInfo()
  console.log('App Launch', options)
})
onShow((options) => {
  console.log('App Show', options)
  // 处理直接进入页面路由的情况：如h5直接输入路由、微信小程序分享后进入等
  // https://github.com/unibest-tech/unibest/issues/192
  if (options?.path) {
    navigateToInterceptor.invoke({ url: `/${options.path}`, query: options.query })
  }
  else {
    navigateToInterceptor.invoke({ url: '/' })
  }
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

button::after {
  border: none;
}
button {
  position: relative;
  display: block;
  margin-left: initial;
  margin-right: initial;
  padding-left: initial;
  padding-right: initial;
  box-sizing: border-box;
  // font-size: 18px;
  text-align: center;
  text-decoration: none;
  // line-height: 1;
  line-height: 1.35;
  // border-radius: 5px;
  -webkit-tap-highlight-color: transparent;
  overflow: initial;
  color: initial;
  background-color: initial;
  width: fit-content;
  height: fit-content;
}
</style>
