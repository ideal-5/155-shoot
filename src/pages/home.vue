<script setup lang='ts'>
// 必须导入需要用到的页面生命周期（即使在当前页面上没有直接使用到）
import { onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import useZPaging from 'z-paging/components/z-paging/js/hooks/useZPaging'

definePage({
  type: 'home',
})

const { menuButtonHeight } = storeToRefs(useSystemStore())

const swiperList = ref([
  'https://wot-ui.cn/assets/redpanda.jpg',
  'https://wot-ui.cn/assets/capybara.jpg',
  'https://wot-ui.cn/assets/panda.jpg',
  'https://wot-ui.cn/assets/moon.jpg',
  'https://wot-ui.cn/assets/meng.jpg',
])

const pagingRef = ref()
useZPaging(pagingRef)
const dataList = ref<Awaited<ReturnType<typeof getTestListApi>>>([])

const waterfallRef = ref()
async function queryList(pageNo: number, pageSize: number) {
  getTestListApi(pageNo, pageSize)
    .then((res) => {
      pagingRef.value.complete(res)
      waterfallRef.value.render(res, pageNo === 1)
    })
    .catch((_res) => {
      pagingRef.value.complete(false)
    })
}

const scrollTop = ref(0)
onPageScroll((e) => {
  scrollTop.value = e.scrollTop
})
</script>

<template>
  <div class="relative min-h100vh wf bg-#F2F3F7">
    <image
      src=""
      class="absolute left-0 top-0 z1 h57.75 wf bg-blueGray"
      mode="widthFix"
    />

    <div class="relative z2">
      <NavBar :scroll-top="scrollTop" scroll-limit="150px" bar-color="#F2F3F7">
        <template #left>
          <div class="box-border size-full f-c justify-between pl3.75 pr1.75">
            <div class="w-fit f-c flex-shrink-0 text-(3.75 #3D3D3D) fw500">
              <i class="i-line-md:map-marker-loop" />
              <div class="ml1">
                西安市
              </div>
            </div>
            <div class="ml1 box-border hf min-w-0 f-c flex-1 pl10">
              <div
                class="box-border wf f-c f-c b-rd-full bg-#fff px3.5 text-(3 #111827)"
                :style="{ height: `${menuButtonHeight}px` }"
                @click="gotoPage('/pages-sub/scenic/search')"
              >
                <i class="i-carbon:search mr0.5 flex-shrink-0 text-4 fw600" />
                <div class="line-clamp-1 min-w-0 flex-1">
                  你想要找些什么
                </div>
              </div>
            </div>
          </div>
        </template>
      </NavBar>

      <div
        class="swiper-box mt4.25"
        style="
      --wot-swiper-item-padding: 0 24rpx;
      --wot-swiper-radius: 0;
      "
      >
        <wd-swiper
          :list="swiperList"
          :duration="600"
          autoplay
          previous-margin="24px"
          next-margin="24px"
          custom-next-image-class="custom-image-prev"
          custom-prev-image-class="custom-image-prev"
          :indicator="false"
        />
      </div>

      <div class="grid grid-cols-2 mb5 mt3.75 box-border h37.5 wf gap-2.5 px3.75">
        <div class="row-span-2 size-full b-rd-3.25" @click="gotoPage('/pages-sub/scenic/list')">
          <image
            :src="`${IMAGE_BASE_URL}/bg/28.png`"
            class="size-full"
            mode="scaleToFill"
          />
        </div>
        <div class="size-full b-rd-3.25">
          <image
            :src="`${IMAGE_BASE_URL}/bg/29.png`"
            class="size-full"
            mode="scaleToFill"
          />
        </div>
        <div class="size-full b-rd-3.25" @click="gotoPage('/pages-sub/retouch/index')">
          <image
            :src="`${IMAGE_BASE_URL}/bg/30.png`"
            class="size-full"
            mode="scaleToFill"
          />
        </div>
      </div>

      <div class="box-border wf px3.75">
        <div class="mb3 wf f-c justify-between">
          <div class="relative text-(3.75 #111827) fw900">
            <span class="relative z2">精选推荐</span>
            <image
              :src="`${IMAGE_BASE_URL}/icon/46.png`"
              mode="heightFix"
              class="absolute right-0 top-0 z1 h-5.25"
            />
          </div>

          <div class="f-c text-(3 #A0AEC0) fw500">
            <div>全部</div>
            <i class="i-line-md:chevron-right ml1" />
          </div>
        </div>

        <z-paging ref="pagingRef" v-model="dataList" :use-page-scroll="true" @query="queryList">
          <waterfall
            ref="waterfallRef"
            :extra-height="84"
            img-key="img"
            class-name="grid grid-cols-2 gap-1"
            :list="dataList"
          >
            <template #item="{ item }">
              <div
                class="mb1 wf flex flex-col overflow-hidden b-rd-2.25 b-rd-tl-3 bg-#fff"
                @click="gotoPage('/pages-sub/scenic/details', { id: 1 })"
              >
                <div class="relative h-fit wf f-c-c">
                  <div class="absolute left-0 top-0 box-border h5.5 w22.75 f-c justify-between px1.5">
                    <image
                      :src="`${IMAGE_BASE_URL}/bg/18.png`"
                      class="absolute inset-0 z1"
                    />
                    <div class="z2 text-(3.5 #fff) fw500">
                      5A
                    </div>
                    <div class="z2 text-(3 #fff) fw500">
                      名胜古迹
                    </div>
                  </div>
                  <WImage
                    :src="item.img"
                    mode="widthFix"
                    custom-class="wf!"
                  />
                </div>
                <div class="box-border h20 wf bg-amber p2.5">
                  <div class="line-clamp-1 mb1.25 wf text-(3.75 #111827) fw500">
                    {{ item.title }}
                  </div>
                  <div class="line-clamp-2 wf text-(3 #A0AEC0)">
                    {{ item.text }}
                  </div>
                </div>
              </div>
            </template>
          </waterfall>

          <!-- 骨架屏 -->
          <template #loading>
            <Loading />
          </template>
          <!-- 下拉刷新  -->
          <template #refresher="{ refresherStatus }">
            <LotRefresh :status="refresherStatus" />
          </template>
          <!-- 底部的加载中 -->
          <template #loadingMoreLoading>
            <LotLoading />
          </template>
          <template #loadingMoreNoMore>
            <LotNoMore />
          </template>
          <template #loadingMoreFail>
            <LotErr />
          </template>
        </z-paging>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.swiper-box {
  :deep(.wd-swiper) {
    @apply h37.5;
    .wd-swiper__track {
      @apply hf!;
    }
    .wd-swiper__image {
      @apply b-rd-2.75! hf!;
    }
    .custom-image-prev {
      @apply h35!;
    }
  }
}
</style>
