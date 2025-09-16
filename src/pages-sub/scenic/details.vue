<script setup lang='ts'>
const { bottomHeightNum, bottomStyle } = useStyle().absoluteBottom(120)

onLoad(({ id }) => {
  console.log('id', id)
})
const videoList = ref([
  'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_150752.mp4',
  'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_155516.mp4',
  'https://wot-ui.cn/assets/moon.jpg',
])
</script>

<template>
  <div class="min-h-100vh w100vw" :style="{ paddingBottom: `${bottomHeightNum + 20}px` }">
    <NavBar bar-color="#fff">
      详情
    </NavBar>
    <div class="wf" style="--wot-swiper-radius:0px">
      <wd-swiper
        :list="videoList"
        autoplay
        :indicator="false"
        custom-class="b-rd-0!"
        :show-controls="false"
      />
    </div>

    <div class="relative wf b-rd-t-3 bg-#fff -mt3">
      <div class="box-border wf px3.75 pb3 pt4">
        <div class="mb2.5 wf">
          <span class="mr1.5 text-(5.5 #111827) fw500">秦始皇兵马俑</span>
          <span class="box-border b-rd-0.5 bg-#F1F1FE px1.75 py0.5 text-(3 #3C6292)">5A</span>
        </div>
        <div class="wf f-c justify-between">
          <div class="box-border b-(1 #E7E7E7 rd-0.25 solid) px1.75 py0.5 text-(2.5 #525456)">
            自然风光
          </div>
          <div class="text-(3 #A0AEC0)">
            <i class="i-line-md:map-marker-alt" />
            <span>距您 33.84km</span>
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
            截至2020年1月，已先后建成并开放了秦俑一、三、二号坑和文物陈列厅。目前秦俑博物馆面积已扩大到46.1公顷，拥有藏品5万余(套)件。一号兵马俑坑内约埋藏陶俑、陶马6000件，同时还有大量的青铜兵器，二号兵马俑坑内埋藏陶俑、陶马1300余件，二号俑坑较一号俑坑的内容更丰富，兵种更齐全;三号俑坑的规模较小，坑内埋藏陶俑、陶马72件;陈列厅内有一、二号铜车马。
          </text>
        </div>

        <div class="text-(4 #111827) fw500">
          热门打卡点
        </div>

        <div class="wf">
          <div
            v-for="i in 10"
            :key="i"
            class="mt3 box-border wf flex b-rd-2.5 bg-#F5F7FB p2"
          >
            <WImage custom-class="size-21.25! b-rd-1.25! overflow-hidden flex-shrink-0!" src="https://dummyimage.com/600x600/004643/fff" />
            <div class="ml2.5 box-border h21.25 min-w0 flex flex-1 flex-col justify-between pb1 pt2">
              <div class="line-clamp-2 text-(3.75 #111827) fw500">
                石林景区
              </div>
              <div class="line-clamp-2 text-(3 #A0AEC0)">
                这是文字内容，字色#A0AEC0。这是文字内容，字色#A0AEC0。这是文字内容，字色这是文字内容，字色#A0AEC0。这是文字内容，字色#A0AEC0。这是文字内容，字色...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div :style="bottomStyle" class="box-border f-c-c bg-#fff px4.5">
      <wd-button custom-class="wf! h11! bg-#1E88E5!" @click="gotoPage('/pages-sub/scenic/check-in', { id: '5' })">
        景点打卡
      </wd-button>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
