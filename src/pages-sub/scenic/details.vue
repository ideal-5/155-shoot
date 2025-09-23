<script setup lang='ts'>
import { getScenicDetailApi } from '@/api'

const { bottomHeightNum, bottomStyle } = useStyle().absoluteBottom(120)
const cityStore = useCityStore()

const detail = ref<Awaited<ReturnType<typeof getScenicDetailApi>>['data']>()

onLoad(async ({ id }) => {
  const { data } = await getScenicDetailApi({ id })
  detail.value = data
})
</script>

<template>
  <div class="min-h-100vh w100vw" :style="{ paddingBottom: `${bottomHeightNum + 20}px` }">
    <NavBar bar-color="#fff">
      详情
    </NavBar>
    <div class="wf" style="--wot-swiper-radius:0px">
      <wd-swiper
        :list="detail?.banner?.split(',')"
        autoplay
        :indicator="false"
        custom-class="b-rd-0!"
        :show-controls="false"
      />
    </div>

    <div class="relative wf b-rd-t-3 bg-#fff -mt3">
      <div class="box-border wf px3.75 pb3 pt4">
        <div class="mb2.5 wf">
          <span class="mr1.5 text-(5.5 #111827) fw500">{{ detail?.title }}</span>
          <span class="box-border b-rd-0.5 bg-#F1F1FE px1.75 py0.5 text-(3 #3C6292)">{{ detail?.type }}A</span>
        </div>
        <div class="wf f-c justify-between">
          <div class="box-border b-(1 #E7E7E7 rd-0.25 solid) px1.75 py0.5 text-(2.5 #525456)">
            {{ detail?.tag }}
          </div>
          <div class="text-(3 #A0AEC0)">
            <i class="i-line-md:map-marker-alt" />
            <span>距您 {{ cityStore.getDistance(detail?.lag, detail?.lon) }}</span>
          </div>
        </div>
      </div>

      <div class="h2.5 wf bg-#F5F7FB" />

      <div class="box-border wf px3.75 py3">
        <div class="text-(4 #111827) fw500">
          游玩攻略
        </div>
        <div class="mb3.75 mt3 box-border wf b-rd-2.5 bg-#F5F7FB p2.5 text-(3.5 #111827)">
          <text selectable user-select>
            {{ detail?.content }}
          </text>
        </div>

        <div class="text-(4 #111827) fw500">
          热门打卡点
        </div>

        <div v-if="detail?.signArea" class="wf">
          <div
            v-for="item in detail?.signArea"
            :key="item.id"
            class="mt3 box-border wf flex b-rd-2.5 bg-#F5F7FB p2"
          >
            <WImage custom-class="size-21.25! b-rd-1.25! overflow-hidden flex-shrink-0!" :src="item.img" />
            <div class="ml2.5 box-border h21.25 min-w0 flex flex-1 flex-col justify-between pb1 pt2">
              <div class="line-clamp-2 text-(3.75 #111827) fw500">
                {{ item.title }}
              </div>
              <div class="line-clamp-2 text-(3 #A0AEC0)">
                {{ item.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div :style="bottomStyle" class="box-border f-c-c bg-#fff px4.5">
      <wd-button custom-class="wf! h11! bg-#1E88E5!" @click="gotoPage('/pages-sub/scenic/check-in', { id: detail?.id })">
        景点打卡
      </wd-button>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
