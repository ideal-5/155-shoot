<script setup lang='ts'>
import { getScenicListApi, getScenicListSelectApi } from '@/api'

const { closeOutside } = useQueue()

const cityStore = useCityStore()
const { cityRead } = storeToRefs(cityStore)

const pagingRef = ref<ZPagingRef>()
const dataList = ref<Awaited<ReturnType<typeof getScenicListApi>>['data']['rows']>([])
const waterfallRef = ref()
async function queryList(page: number, limit: number) {
  getScenicListApi({ page, limit, type: '2', cityCode: cityRead.value.cityCode })
    .then(({ data }) => {
      pagingRef.value.complete(data.rows)
      waterfallRef.value.render(data.rows, page === 1)
    })
    .catch((_res) => {
      pagingRef.value.complete(false)
    })
}

const scenicListSelect = ref<Awaited<ReturnType<typeof getScenicListSelectApi>>>([])
const activeScenicSelectId = ref('')

onLoad(async () => {
  const data = await getScenicListSelectApi()
  scenicListSelect.value = data
  activeScenicSelectId.value = data?.[0]?.value
})

function activeScenicSelectChange({ value }: { value: string | number }) {
  gotoPage('/pages-sub/scenic/details', { id: `${value}` })
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
      <div class="box-border wf bg-#fff px3.75">
        <NavBar>热门景点</NavBar>
        <div class="box-border wf f-c justify-between py2.25" @click="closeOutside">
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
          <!-- <div class="f-c">
            <div class="mr1 text-(3 #111827) fw500">
              全部
            </div>
            <i class="i-line-md:chevron-small-right" />
          </div> -->

          <wd-drop-menu>
            <wd-drop-menu-item
              v-model="activeScenicSelectId"
              :options="scenicListSelect"
              @change="activeScenicSelectChange"
            />
          </wd-drop-menu>
        </div>
      </div>
    </template>

    <div class="box-border wf px3.5">
      <waterfall
        ref="waterfallRef"
        :extra-height="84"
        img-key="img"
        class-name="grid grid-cols-2 gap-1"
        :list="dataList"
      >
        <template #item="{ item }">
          <div
            class="mt3 wf flex flex-col overflow-hidden b-rd-2.25 b-rd-tl-3 bg-#fff"
            @click="gotoPage('/pages-sub/scenic/details', { id: item.id })"
          >
            <div class="relative h-fit wf f-c-c">
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
    </div>

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
</template>

<style scoped lang='scss'>

</style>
