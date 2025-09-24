<script setup lang='ts'>
import { amountWithdrawRecordApi } from '@/api'

const pagingRef = ref<ZPagingRef>()
const dataList = ref<Awaited<ReturnType<typeof amountWithdrawRecordApi>>['data']>([])
async function queryList(page: number, limit: number) {
  if (page > 1) {
    pagingRef.value.complete([])
  }
  amountWithdrawRecordApi()
    .then(({ data }) => {
      pagingRef.value.complete(data)
    })
    .catch((_res) => {
      pagingRef.value.complete(false)
    })
}

const statusText = {
  '-1': { text: '审核中', color: '#A0AEC0' },
  '1': { text: '待确认', color: '#4CAF50' },
  '2': { text: '已完成', color: '#1E88E5' },
  '-2': { text: '已拒绝', color: '#FF594D' },

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
        class="box-border wf b-b-(1 #EFEFEF solid) py3"
      >
        <div class="wf f-c justify-between">
          <div>
            <div class="text-(3.5 #111827) fw500">
              <span>提现-</span>
              <span :style="{ color: statusText[item.status].color }">{{ statusText[item.status].text }}</span>
            </div>
            <div class="text-(3 #A0AEC0)" fw500>
              {{ item.create_time }}
            </div>
          </div>
          <div class="text-(3.75 #FF7252) fw500">
            {{ item.cash_amount }}
          </div>
        </div>
        <div v-if="Number(item.status) === 1" class="box-border wf f-c justify-between py1">
          <div class="min-w-0 flex-1 text-(2.5 #A0AEC0)">
            {{ item.wx_json }}
          </div>
          <wd-button plain custom-class="w-fit! flex-shrink-0! h5.25! b-rd-1.25! min-w-0! px1.5!">
            立即提现
          </wd-button>
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
