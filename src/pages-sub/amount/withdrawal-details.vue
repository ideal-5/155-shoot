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
    :paging-style="{ backgroundColor: '#F2F3F7' }"
    :default-page-size="20"
    @query="queryList"
  >
    <template #top>
      <NavBar bar-color="#fff">
        提现记录
      </NavBar>
    </template>

    <div class="mt2.5 box-border wf bg-#fff px3.75">
      <div
        v-for="item in dataList"
        :key="item.id"
        class="box-border wf f-c justify-between b-b-(1 #EFEFEF solid) py3"
      >
        <div>
          <div class="text-(3.5 #111827) fw500">
            提现
          </div>
          <div class="text-(3 #A0AEC0)" fw500>
            2025.06.09 15:20
          </div>
        </div>
        <div class="text-(3.75 #FF7252) fw500">
          -500
        </div>
      </div>
    </div>

    <!-- 骨架屏 -->
    <template #loading>
      <Loading :columns="1" :for-count="8" :row-col="[[{ width: '100%', height: '80px' }]]" />
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
