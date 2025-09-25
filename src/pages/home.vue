<script setup lang='ts'>
// 必须导入需要用到的页面生命周期（即使在当前页面上没有直接使用到）
import { onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import useZPaging from 'z-paging/components/z-paging/js/hooks/useZPaging'
import { getConfigBannerApi, getHomeRecommendScenicApi, getScenicStrategyApi } from '@/api'

definePage({
  type: 'home',
})

const { menuButtonHeight } = storeToRefs(useSystemStore())

const swiperList = ref<Awaited<ReturnType<typeof getConfigBannerApi>>['data']>([])
onLoad(async () => {
  const { data } = await getConfigBannerApi()
  swiperList.value = data
})

const cityStore = useCityStore()
const { city, cityCode } = storeToRefs(cityStore)

const cityList = computed(() => [city.value.province, city.value.city, city.value.district])

function addressChange(e: { detail: { value: string[] } }) {
  cityStore.setCity(e.detail.value.join(''))
}

const pagingRef = ref()
useZPaging(pagingRef)
const dataList = ref<Awaited<ReturnType<typeof getHomeRecommendScenicApi>>['data']>([])

const waterfallRef = ref()
async function queryList(pageNo: number) {
  if (pageNo > 1) {
    pagingRef.value.complete([])
    return
  }
  getHomeRecommendScenicApi({ cityCode: cityCode.value })
    .then(({ data }) => {
      pagingRef.value.complete(data)
      waterfallRef.value.render(data, pageNo === 1)
    })
    .catch((_res) => {
      pagingRef.value.complete(false)
    })
}

onLoad(async () => {
  await cityStore.initLocation()
  pagingRef.value.reload()
})

const scrollTop = ref(0)
onPageScroll((e) => {
  scrollTop.value = e.scrollTop
})

async function gotoStrategy() {
  const { data } = await getScenicStrategyApi()
  uni.navigateTo({
    url: '/pages-sub/settings/html-page',
    success(res) {
      res.eventChannel.emit('sendData', { title: data.title, content: data.content })
    },
  })
}

const userStore = useUserStore()
const { inviteCode } = storeToRefs(userStore)

onLoad((options) => {
  if (options.scene) {
    inviteCode.value = options.scene
  }
})
</script>

<template>
  <div class="relative min-h100vh wf bg-#F2F3F7">
    <image
      :src="`${IMAGE_BASE_URL}/bg/25.png`"
      class="absolute left-0 top-0 z1 wf"
      mode="widthFix"
    />

    <div class="relative z2">
      <NavBar :scroll-top="scrollTop" scroll-limit="150px" bar-color="#F2F3F7">
        <template #left>
          <div class="box-border size-full f-c justify-between pl3.75 pr1.75">
            <div class="w-fit f-c flex-shrink-0 text-(3.75 #3D3D3D) fw500">
              <picker
                mode="region"
                level="city"
                :value="cityList"
                class="grid grid-cols-1 wf"
                @change="addressChange"
              >
                <div class="wf f-c">
                  <i class="i-line-md:map-marker-loop" />
                  <div class="ml1">
                    {{ city.city }}
                  </div>
                </div>
              </picker>
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
          :list="swiperList as any"
          value-key="img"
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
        <div class="size-full b-rd-3.25" @click="gotoStrategy">
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

        <z-paging ref="pagingRef" v-model="dataList" :auto="false" :use-page-scroll="true" @query="queryList">
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
                @click="gotoPage('/pages-sub/scenic/details', { id: item.id })"
              >
                <div class="relative h-fit wf f-c-c">
                  <!-- <div class="absolute left-0 top-0 box-border h5.5 w22.75 f-c justify-between px1.5">
                    <image
                      :src="`${IMAGE_BASE_URL}/bg/18.png`"
                      class="absolute inset-0 z1"
                    />
                    <div class="z2 text-(3.5 #fff) fw500">
                      {{ item.type }}A
                    </div>
                    <div class="z2 text-(3 #fff) fw500">
                      {{ item.tag }}
                    </div>
                  </div> -->

                  <div class="absolute left-0 top-0 z2 f-c b-rd-br-2.25 bg-#000">
                    <div class="box-border b-rd-br-2.25 bg-[linear-gradient(90deg,#D49150_0%,#F1CB8B_100%)] px2 py0.5 text-(3.5 #fff) fw500">
                      {{ item.type }}A
                    </div>
                    <div class="box-border px2 py0.5 text-(3 #fff) fw500">
                      {{ item.tag }}
                    </div>
                  </div>

                  <WImage
                    :src="item.img"
                    mode="widthFix"
                    custom-class="wf!"
                  />
                </div>
                <div class="box-border h20 wf p2.5">
                  <div class="line-clamp-1 mb1.25 wf text-(3.75 #111827) fw500">
                    {{ item.title }}
                  </div>
                  <div class="line-clamp-2 wf text-(3 #A0AEC0)">
                    {{ item.content }}
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
