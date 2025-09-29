<script setup lang='ts'>
import { getScenicListSelectApi } from '@/api'

const height = ref<number>(0)
const anchors = ref<number[]>([])

const { SYSTEM, navbarHeight } = storeToRefs(useSystemStore())
onLoad(() => {
  anchors.value = [0, SYSTEM.value.windowHeight - navbarHeight.value]
  height.value = anchors.value[0]
})

const scenicListSelect = ref<Awaited<ReturnType<typeof getScenicListSelectApi>>>([])
const activeScenicSelectId = ref('')

const activeScenic = computed(() => {
  return scenicListSelect.value.find(item => item.value === activeScenicSelectId.value)
})

onLoad(async () => {
  const data = await getScenicListSelectApi()
  scenicListSelect.value = data
})

const toast = useToast()

function tapToSelfie() {
  if (!activeScenicSelectId.value) {
    toast.warning('请先选择景区')
    height.value = anchors.value[1]
    return
  }
  gotoPage('/pages-sub/selfie/index')
}
</script>

<template>
  <div class="min-h100vh w100vw">
    <image
      :src="`${IMAGE_BASE_URL}/bg/10.png`"
      mode="widthFix"
      class="fixed left-0 top-0 z1 wf"
    />
    <div class="relative z2 box-border wf px3.75">
      <NavBar>获取视频</NavBar>

      <div class="mb27.75 box-border wf flex b-rd-2 bg-#fff px2.5 py1.5">
        <div class="min-w-0 f-c flex-1 text-(3 #A0AEC0) fw500">
          <image
            :src="`${IMAGE_BASE_URL}/bg/4.png`"
            mode="widthFix"
            class="w10.25"
          />
          <div class="ml2 mr0.5">
            {{ activeScenic ? activeScenic.label : '请选择景区' }}
          </div>
          <i class="i-line-md:chevron-small-right" />
        </div>
        <div class="box-border w-fit flex-shrink-0 b-l-(1 #F2F3F7 solid) pl6.25">
          <wd-button custom-class="w21.25! min-w-0! h9! b-rd-2! bg-[linear-gradient(180deg,#1E88E5_0%,#80B7E7_100%)]! text-(3.5!) fw500!" @click="height = anchors[1]">
            获取景区
          </wd-button>
        </div>
      </div>

      <div class="wf flex items-end">
        <div class="mb4.5 mr3.25 size-16.5 flex-shrink-0 b-rd-full" />
        <div class="min-w-0 flex-1">
          <image
            :src="`${IMAGE_BASE_URL}/bg/26.png`"
            mode="widthFix"
            class="wf"
          />
        </div>
        <div class="mb4.5 ml3.25 size-16.5 f-c-c flex-shrink-0 flex-col b-rd-full bg-[linear-gradient(180deg,#1E88E5_0%,#80B7E7_100%)] text-(3 #ffff) fw500">
          <div>点击获取</div>
          <div>游玩攻略</div>
        </div>
      </div>

      <div class="relative mb10.5 mt8.5 h29 wf">
        <image
          :src="`${IMAGE_BASE_URL}/bg/7.png`"
          class="absolute inset-0 z1"
        />
        <div class="relative z2 box-border size-full f-c justify-around px2">
          <div class="f-c-c flex-col">
            <div class="mb3 text-(3.75 #111827) fw500">
              避免遮挡
            </div>
            <image
              :src="`${IMAGE_BASE_URL}/icon/30.png`"
              class="size-11.25"
            />
          </div>
          <image
            :src="`${IMAGE_BASE_URL}/bg/5.png`"
            mode="widthFix"
            class="w8.75"
          />
          <div class="f-c-c flex-col">
            <div class="mb3 text-(3.75 #111827) fw500">
              光线充足
            </div>
            <image
              :src="`${IMAGE_BASE_URL}/icon/25.png`"
              class="size-11.25"
            />
          </div>
          <image
            :src="`${IMAGE_BASE_URL}/bg/5.png`"
            mode="widthFix"
            class="w8.75"
          />
          <div class="f-c-c flex-col">
            <div class="mb3 text-(3.75 #111827) fw500">
              正对手机
            </div>
            <image
              :src="`${IMAGE_BASE_URL}/icon/21.png`"
              class="size-11.25"
            />
          </div>
        </div>
      </div>

      <div class="box-border wf px6">
        <wd-button custom-class="h13.5! fw500! text-4.5! wf! bg-[linear-gradient(180deg,#1E88E5_0%,#80B7E7_100%)]!" @click="tapToSelfie">
          自拍获取视频
        </wd-button>
      </div>
    </div>
  </div>

  <wd-floating-panel v-model:height="height" :anchors="anchors">
    <wd-cell-group border>
      <wd-cell
        v-for="item in scenicListSelect" :key="item.value" clickable :title="item.label" @click="() => {
          activeScenicSelectId = item.value
          height = anchors[0]
        }"
      >
        <i v-if="activeScenicSelectId === item.value" class="i-line-md:check-all" />
      </wd-cell>
    </wd-cell-group>
  </wd-floating-panel>
</template>

<style scoped lang='scss'>

</style>
