<script setup lang='ts'>
const { closeOutside } = useQueue()

const pagingRef = ref<ZPagingRef>()

type TestList = ((Awaited<ReturnType<typeof getTestListApi>>[number]) & { isPlay: boolean, isPay: boolean })[]
const dataList = ref<TestList>([])
async function queryList(pageNo: number, pageSize: number) {
  getTestListApi(pageNo, pageSize)
    .then((res) => {
      pagingRef.value.complete(res.map(item => ({
        ...item,
        img: `https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4`,
        isPlay: false,
        isPay: [true, false][Math.floor(Math.random() * 2)],
      }) satisfies TestList[number]))
    })
    .catch((_res) => {
      pagingRef.value.complete(false)
    })
}

const value1 = ref(0)

const { SYSTEM } = storeToRefs(useSystemStore())
const part = ref(SYSTEM.value.windowHeight / 10) // 可用屏幕宽度的1/10
function playVideo(item: any) {

}

function stopVideo(item: any) {
  item.isPlay = false
  uni.createVideoContext(`video${item.id}`).pause()
}

const editMode = ref(false) // 编辑模式

const activeVideo = ref<number[]>([])

// 选择
function selectVideo(item: TestList[number]) {
  const index = activeVideo.value.findIndex(i => i === item.id)
  if (index === -1) {
    activeVideo.value.push(item.id)
  }
  else {
    activeVideo.value.splice(index, 1)
  }
}

// 点击购买的视频
function tapPayVideo(item: TestList[number]) {
  if (editMode.value) {
    selectVideo(item)
  }
  else {
    uni.createVideoContext(`video${item.id}`).play()
    item.isPlay = true
  }
}

// 长按后买的视频
async function longPressPayVideo(item: TestList[number]) {
  editMode.value = true
  await nextTick()
  activeVideo.value.push(item.id)
}

function exitEditMode() {
  editMode.value = false
  activeVideo.value = []
}

function tapDownload() {
  console.log('tapDownload')
}
</script>

<template>
  <z-paging
    ref="pagingRef"
    v-model="dataList"
    :paging-style="{ backgroundColor: '#F2F3F7' }"
    @query="queryList"
  >
    <template #top>
      <NavBar bar-color="#fff">
        我的视频
      </NavBar>
      <div class="box-border wf f-c justify-between bg-#fff px3.75 py2.25" @click="closeOutside">
        <!-- custom-input-class="h7.25!" -->
        <div class="f-c">
          <image
            :src="`${IMAGE_BASE_URL}/bg/4.png`"
            mode="widthFix"
            class="w10.25"
          />
          <div class="ml2 text-(3 #111827) fw500">
            选择景区
          </div>
        </div>
        <wd-drop-menu>
          <wd-drop-menu-item
            v-model="value1" :options="[
              { label: '全部商品', value: 0 },
              { label: '阆中南津关古镇', value: 1 },
              { label: '活动商品', value: 2 },
            ]"
          />
        </wd-drop-menu>
      </div>
      <div class="my2.5 box-border h8.5 wf flex px3.75">
        <wd-notice-bar
          color="#FF594D"
          background-color="#FFDCDA"
          text="视频/照片七天后自动删除"
          prefix="warn-bold"
          custom-class="flex-1! min-w-0! hf!"
        />
        <div class="box-border w0 pl0 transition-all" :class="[editMode && 'w26 pl2.5']">
          <div class="box-border hf wf f-c-c overflow-hidden whitespace-normal b-rd-2 bg-#fff text-(3 #1E88E5)" @click="exitEditMode">
            退出管理模式
          </div>
        </div>
      </div>
    </template>

    <div class="grid grid-cols-2 box-border wf gap-x-2.75 gap-y-2.5 px3.75">
      <template v-for="item in dataList" :key="item.id">
        <!--     -->
        <Follow
          is-leave-document
          :mask-opacity="0.7"
          :z-index="10"
          @tap-mask="stopVideo(item)"
        >
          <FollowDiv
            v-model:is-follow="item.isPlay"
            :distance="{ top: part * 3, left: 0 }"
          >
            <div
              class="relative h32 wf overflow-hidden b-rd-2"
              :style="[
                item.isPlay && { width: '100vw', height: '40vh' },
              ]
              "
              @click="playVideo(item)"
            >
              <div
                v-if="item.isPay && !item.isPlay"
                class="absolute inset-0 z2 size-full"
                @click.stop="tapPayVideo(item)"
                @longpress="longPressPayVideo(item)"
              >
                <div
                  v-if="editMode"
                  class="absolute right-1.75 top-1.75 size-4.75 f-c-c b-(4 #fff rd-full solid) transition-all"
                  :class="[activeVideo.includes(item.id) && 'b-#1E88E5!']"
                >
                  <div
                    class="size-0 b-rd-full bg-#1E88E5 transition-all"
                    :class="[activeVideo.includes(item.id) && 'size-70%']"
                  />
                </div>

                <div
                  class="absolute bottom-0 left-0 line-clamp-1 box-border wf bg-#000/50 px1.5 py1 text-(3 #fff) fw500"
                >
                  {{ item.title }}
                </div>
              </div>

              <div
                v-if="!item.isPay"
                class="absolute inset-0 z2 box-border size-full f-c flex-col justify-between bg-#000/50 py7 text-#fff fw500" @click.stop
              >
                <i class="i-line-md:alert-circle text-6 fw700" />
                <div class="text-(3.75)">
                  未购买无法查看
                </div>
                <div class="text-3">
                  点击购买
                </div>
              </div>

              <video
                :id="`video${item.id}`"
                :src="item.img"
                object-fit="fill"
                class="z1 size-full"
                :controls="item.isPlay"
                :show-fullscreen-btn="item.isPlay"
                :show-play-btn="item.isPlay"
                :show-center-play-btn="item.isPlay"
                :enable-progress-gesture="item.isPlay"
                :enable-play-gesture="item.isPlay"
              />
            </div>
          </FollowDiv>
        </Follow>
      </template>
    </div>

    <template #bottom>
      <div class="box-border wf f-c justify-between bg-#fff px3.75 pt2.75 pb-safe">
        <div>  {{ editMode ? `已选择(${activeVideo.length})` : '' }}   </div>
        <wd-button custom-class="h11! w31.75! bg-#1E88E5!" @click="editMode ? tapDownload() : editMode = true">
          {{ editMode ? '立即下载' : '编辑' }}
        </wd-button>
      </div>
    </template>

    <!-- 骨架屏 -->
    <template #loading>
      <Loading :for-count="8" :row-col="[[{ width: '100%', height: '128px' }]]" />
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
</template>

<style scoped lang='scss'>

</style>
