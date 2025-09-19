<script setup lang='ts'>
const pagingRef = ref<ZPagingRef>()
const dataList = ref<Awaited<ReturnType<typeof getTestListApi>>>([])
async function queryList(pageNo: number, pageSize: number) {
  getTestListApi(pageNo, pageSize)
    .then((res) => {
      pagingRef.value.complete(res)
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
          <div class="mr2 flex-shrink-0 b-rd-1.25 bg-amber size-13.75!" />

          <div class="h13.75 min-w-0 flex flex-1">
            <div class="min-w-0 flex-1">
              <div class="line-clamp-1">
                <span class="mr1.5 text-(3.75 #111827) fw500">石林景区</span>
                <span class="box-border b-rd-0.5 bg-#F1F1FE px1.75 py0.5 text-(3 #3C6292)">5A</span>
              </div>
              <div class="mt2 box-border w-fit b-(1 #E7E7E7 rd-0.25 solid) px1.75 py0.5 text-(2.5 #525456)">
                自然风光
              </div>
            </div>
            <div class="hf w15 f-c-c flex-shrink-0">
              <wd-button plain custom-class="wf! h5.5! min-w-0! text-(2.5! #1E88E5!)  fw500!" @click="gotoPage('/pages-sub/me/footprints-details')">
                查看详情
              </wd-button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 h42.25 wf gap-2.25">
          <div class="col-span-2 row-span-2 b-rd-2 bg-#f56c6c">
            1
          </div>
          <div class="size-full b-rd-2 bg-#f56c6c">
            2
          </div>
          <div class="relative size-full overflow-auto b-rd-2 bg-#f56c6c">
            <div class="absolute inset-0 f-c-c bg-#000/50 text-(3.75 #fff) fw500" @click="gotoPage('/pages-sub/me/footprints-details')">
              +6
            </div>

            3
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
