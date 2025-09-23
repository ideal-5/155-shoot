<script setup lang='ts'>
import { getScenicMyFootprintApi } from '@/api'

type List = (Awaited<ReturnType<typeof getScenicMyFootprintApi>>['data']['rows'][number] & { imgList: string[] })[]

const pagingRef = ref<ZPagingRef>()
const dataList = ref<List>([])
async function queryList(page: number, limit: number) {
  getScenicMyFootprintApi({ page, limit })
    .then(({ data }) => {
      pagingRef.value.complete(data.rows.map(item => ({ ...item, imgList: item.imgs.split(',') } satisfies List[number])))
    })
    .catch((_res) => {
      pagingRef.value.complete(false)
    })
}
</script>

<template>
  <z-paging
    ref="pagingRef"
    v-model="dataList"
    :paging-style="{ backgroundColor: '#F7F7F7' }"
    @query="queryList"
  >
    <template #top>
      <NavBar bar-color="#fff">
        我的足迹
      </NavBar>
    </template>

    <div class="box-border wf px3.75">
      <div
        v-for="item in dataList"
        :key="item.id"
        class="mt3 box-border wf b-rd-2 bg-#fff px3 py3"
      >
        <div class="mb3 box-border wf flex">
          <div class="mr2 flex-shrink-0 overflow-hidden b-rd-1.25 size-13.75!">
            <WImage custom-class="size-full!" :src="item.areaInfo.img" />
          </div>

          <div class="h13.75 min-w-0 flex flex-1">
            <div class="min-w-0 flex-1">
              <div class="line-clamp-1">
                <span class="mr1.5 text-(3.75 #111827) fw500">{{ item.areaInfo.title }}</span>
                <span class="box-border b-rd-0.5 bg-#F1F1FE px1.75 py0.5 text-(3 #3C6292)">{{ item.areaInfo.type }}A</span>
              </div>
              <div class="mt2 box-border w-fit b-(1 #E7E7E7 rd-0.25 solid) px1.75 py0.5 text-(2.5 #525456)">
                {{ item.areaInfo.tag }}
              </div>
            </div>
            <div class="hf w15 f-c-c flex-shrink-0">
              <wd-button plain custom-class="wf! h5.5! min-w-0! text-(2.5! #1E88E5!)  fw500!" @click="gotoPage('/pages-sub/me/footprints-details', { id: item.id })">
                查看详情
              </wd-button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 h42.25 wf gap-2.25">
          <div class="col-span-2 row-span-2 overflow-hidden b-rd-2">
            <WImage v-if="item.imgList[0]" enable-preview custom-class="size-full!" :src="item.imgList[0]" />
          </div>
          <div class="size-full overflow-hidden b-rd-2">
            <WImage v-if="item.imgList[1]" enable-preview custom-class="size-full!" :src="item.imgList[1]" />
          </div>
          <div class="relative size-full overflow-auto overflow-hidden b-rd-2">
            <div v-if="item.imgList[2] && item.imgList.length > 3" class="absolute inset-0 z2 f-c-c bg-#000/50 text-(3.75 #fff) fw500" @click="gotoPage('/pages-sub/me/footprints-details', { id: item.id })">
              +{{ item.imgList.length - 3 }}
            </div>
            <WImage v-if="item.imgList[2]" enable-preview custom-class="size-full!" :src="item.imgList[2]" />
          </div>
        </div>
      </div>
    </div>

    <!-- 骨架屏 -->
    <template #loading>
      <Loading :columns="1" :row-col="[[{ width: '100%', height: '250px' }]]" />
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
