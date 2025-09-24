<script setup lang='ts'>
// 必须导入需要用到的页面生命周期（即使在当前页面上没有直接使用到）
import { onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import useZPaging from 'z-paging/components/z-paging/js/hooks/useZPaging'
import { amountDistributionCenterApi } from '@/api'

const { userInfo } = storeToRefs(useUserStore())

const pagingRef = ref()
useZPaging(pagingRef)
const dataList = ref<Awaited<ReturnType<typeof amountDistributionCenterApi>>['data']['rows']>([])

const allAmount = ref('')
const allNums = ref('')

async function queryList(page: number, limit: number) {
  amountDistributionCenterApi({ page, limit })
    .then(({ data }) => {
      allAmount.value = data.all_amount
      allNums.value = data.all_nums
      pagingRef.value.complete(data.rows)
    })
    .catch((_res) => {
      pagingRef.value.complete(false)
    })
}
</script>

<template>
  <div class="min-h-100vh w100vw bg-[linear-gradient(to_bottom,#1E88E5,#F2F3F7_610rpx)]">
    <NavBar />
    <div class="my3.5 box-border wf f-c px5">
      <WImage
        custom-class="size-7! overflow-hidden! b-rd-full! mr1.25!"
        :src="userInfo?.img"
      />
      <div class="text-(3.75 #fff) fw500">
        {{ userInfo?.nickname }}
      </div>
    </div>

    <div class="box-border wf px5">
      <div class="box-border wf flex b-rd-2 bg-#fff py6">
        <div class="box-border min-w-0 flex-1 flex-shrink-0 pl5.5">
          <div class="mb1.5 text-(3 #111827) fw500">
            获得收益
          </div>
          <div class="text-(6.5 #000000)">
            {{ allAmount }}
          </div>
        </div>
        <div class="box-border min-w-0 flex-1 flex-shrink-0 pl5.5" @click="gotoPage('/pages-sub/amount/distribution-team')">
          <div class="mb1.5 f-c text-(3 #111827) fw500">
            <span>我的团队</span>
            <i class="i-line-md:chevron-small-right" />
          </div>
          <div class="text-(6.5 #000000)">
            {{ allNums }}
          </div>
        </div>
      </div>
    </div>

    <div class="mt4.5 box-border wf px9.5">
      <wd-button custom-class="bg-#1E88E5! h12! wf!">
        邀请好友
      </wd-button>
    </div>

    <div class="box-border wf px3.5">
      <div class="mb2.75 mt5 text-(4 #222222) fw500">
        获得收益
      </div>

      <z-paging ref="pagingRef" v-model="dataList" :use-page-scroll="true" @query="queryList">
        <template v-for="item in dataList" :key="item.id">
          <div class="mt2.5 box-border wf b-rd-1.5 bg-#fff px3 py2.5">
            <div class="wf f-c justify-between text-(3 #333333) fw500">
              <div class="f-c">
                <WImage :src="item.img" custom-class="size-5.5! overflow-hidden! b-rd-full! mr1.25!" />
                <div>
                  {{ item.nickname }}
                </div>
              </div>
              <div>{{ item.create_time }}</div>
            </div>

            <div class="mt2.75 wf f-c justify-between">
              <div class="text-(4.25 #333333) fw500">
                {{ item.type_str }}
              </div>
              <div>
                <span class="text-(3 #333333)">获得收益:</span>
                <span class="text-(3.5 #D94A3B) fw500">+{{ item.amount }}</span>
              </div>
            </div>
          </div>
        </template>
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
  </div>
</template>

<style scoped lang='scss'>

</style>
