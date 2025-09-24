<script setup lang='ts'>
import { amountMyCouponListApi } from '@/api'

const activeTab = ref(0)

const tabList = ref([
  { label: '未使用', id: -1 },
  { label: '已使用', id: 1 },
] as const)

const pagingRef = ref<ZPagingRef>()
const dataList = ref<Awaited<ReturnType<typeof amountMyCouponListApi>>['data']>([])

async function queryList(page: number) {
  if (page > 1) {
    pagingRef.value.complete([])
    return
  }
  amountMyCouponListApi(tabList.value[activeTab.value].id)
    .then(({ data }) => {
      console.log('data', data)
      pagingRef.value.complete(data)
    })
    .catch((_res) => {
      pagingRef.value.complete(false)
    })
}

async function tabChange() {
  await nextTick()
  pagingRef.value.reload()
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
        优惠券
      </NavBar>

      <wd-tabs v-model="activeTab" @change="tabChange">
        <block v-for="item in tabList" :key="item.id">
          <wd-tab :title="item.label" />
        </block>
      </wd-tabs>
    </template>

    <div class="box-border wf px3.75">
      <div v-for="item in dataList" :key="item.cid" class="mt2.5 box-border wf flex b-rd-2 bg-#fff px3 py2.5">
        <div
          class="mr3.25 h19 w30 f-c-c flex-col b-rd-1.25 text-#fff fw500"
          :class="[activeTab === 1 ? 'bg-#A6ABB2' : 'bg-[linear-gradient(133deg,#3081F6_0%,#5CB7FB_100%)]']"
        >
          <div>
            <span class="text-3.5">￥</span>
            <span class="text-7.25">{{ item.amount }}</span>
          </div>
          <div class="text-2.75">
            {{ Number(item.rank) === 0 ? '无门槛' : `满${item.rank}元可用` }}
          </div>
        </div>

        <div class="min-w-0 flex flex-1">
          <div class="hf min-w-0 flex flex-1 flex-col justify-between text-(2.5 #A0AEC0)">
            <div class="text-(3.5 #3D3D3D) fw500">
              {{ item.title }}
            </div>
            <div>{{ item.goods_type_str }}</div>
            <div>{{ item.end_time }}</div>
          </div>

          <div class="ml2 hf w15 f-c-c flex-shrink-0">
            <image
              v-if="activeTab === 1"
              :src="`${IMAGE_BASE_URL}/bg/19.png`"
              class="size-15"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 骨架屏 -->
    <template #loading>
      <Loading :columns="1" :row-col="[[{ width: '100%', height: '100px' }]]" />
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
