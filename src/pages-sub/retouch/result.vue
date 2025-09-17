<script setup lang='ts'>
const { SYSTEM } = storeToRefs(useSystemStore())

const part = ref(SYSTEM.value.windowWidth / 10) // 可用屏幕宽度的1/10

const imgList = ref([
  { img: 'https://picsum.photos/200/300', text: '原片', isFollow: false },
  { img: 'https://picsum.photos/200/300', text: '美颜', isFollow: false },
])

const existFollow = computed(() => imgList.value.some(item => item.isFollow))
</script>

<template>
  <div class="min-h100vh w100vw bg-#F2F3F7">
    <NavBar bar-color="#fff">
      旅游攻略
    </NavBar>
    <div class="grid grid-cols-2 mb20 mt5 box-border wf gap-x-3.75 px3.5">
      <template v-for="(item, ind) in imgList" :key="ind">
        <Follow :mask-opacity="0.7" :z-index="10" @tap-mask="item.isFollow = false">
          <FollowDiv
            v-model:is-follow="item.isFollow"
            :distance="{ top: 100, left: part }"
          >
            <div
              class="relative wf overflow-hidden b-rd-2.5 transition-all origin-c!"
              :style="{ width: item.isFollow ? `${part * 8}px` : '100%' }"
              @click="item.isFollow = true"
            >
              <div class="absolute left-0 top-0 z2 box-border f-c-c b-rd-br-2.25 bg-#000000/50 px1.5 py0.5 text-(3.5 #fff) fw500">
                {{ item.text }}
              </div>
              <WImage loading-class="h50!" custom-class="wf! overflow-hidden! b-rd-2.5!" mode="widthFix" :src="item.img" />
            </div>
          </FollowDiv>
        </Follow>
      </template>
    </div>

    <div class="relative z11 box-border wf px8.75">
      <wd-button custom-class="bg-[linear-gradient(156deg,#AFA3F8_0%,#777BF6_100%)]! wf! h11.25! text-(4.75!) fw500!">
        {{ existFollow ? '保存图片' : '重新生成' }}
      </wd-button>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
