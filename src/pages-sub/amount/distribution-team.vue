<script setup lang='ts'>
// 必须导入需要用到的页面生命周期（即使在当前页面上没有直接使用到）
import { onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import useZPaging from 'z-paging/components/z-paging/js/hooks/useZPaging'
import { amountMyTeamListApi } from '@/api'

const pagingRef = ref()
useZPaging(pagingRef)
const dataList = ref<Awaited<ReturnType<typeof amountMyTeamListApi>>['data']['rows']>([])

const allAmount = ref('')

async function queryList(page: number, limit: number) {
  amountMyTeamListApi({ page, limit })
    .then(({ data }) => {
      allAmount.value = data.all_amount
      pagingRef.value.complete(data.rows)
    })
    .catch((_res) => {
      pagingRef.value.complete(false)
    })
}
</script>

<template>
  <div class="box-border w100vw pb-safe">
    <NavBar bar-color="#fff">
      我的团队
    </NavBar>
    <div class="box-border wf px5.75 py4.75">
      <div class="box-border wf f-c justify-between b-rd-2 bg-#1E88E5 p4.75">
        <div class="text-#fff">
          <div class="mb1 text-3 fw500">
            获得收益
          </div>
          <div class="text-6.5">
            {{ allAmount }}
          </div>
        </div>

        <wd-button custom-class="bg-#fff! w25.25! h7.75!">
          <div class="f-c text-(3 #1E88E5) fw500">
            <i class="i-line-md:account" />
            <div>我的邀请码</div>
          </div>
        </wd-button>
      </div>
    </div>

    <div class="h2.5 wf bg-#EDEFF1" />

    <z-paging ref="pagingRef" v-model="dataList" :use-page-scroll="true" @query="queryList">
      <div v-for="item in dataList" :key="item.id" class="mt5 box-border wf px3.75">
        <div class="wf f-c">
          <WImage enable-preview custom-class="size-12.5! b-rd-full! overflow-hidden!" :src="item.img" />
          <div class="ml3.75">
            <div class="text-(3.5 #222222) fw500">
              {{ item.nickname }}
            </div>
            <div class="text-(3 #666666) fw500">
              邀请时间:{{ item.create_time }}
            </div>
          </div>
        </div>
        <div class="mt4.75 box-border wf b-rd-2 bg-#F5F5F5 px4.75 py3.25">
          <div>
            <span class="text-(3 #333333)">贡献收益:</span>
            <span class="text-(3.5 #D94A3B) fw500">￥{{ item.cash_fee }}</span>
          </div>
        </div>
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
  </div>
</template>

<style scoped lang='scss'>

</style>
