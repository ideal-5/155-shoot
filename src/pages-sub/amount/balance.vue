<script setup lang='ts'>
import type { UnwrapRef } from 'vue'

const { userInfo } = storeToRefs(useUserStore())

const pagingRef = ref(null)
const activeTab = ref<UnwrapRef<typeof tabs>[number]['type']>('in')
const tabs = ref([
  {
    name: '收入',
    type: 'in',
  },
  {
    name: '支出',
    type: 'out',
  },
] as const)

function tabChange() {
  pagingRef.value.reload()
}

type List = Awaited<ReturnType<typeof getTestListApi>>
const dataList = ref<List>([])

function queryList(page?: number, pageSize?: number) {
  getTestListApi(
    page,
    pageSize,
  )
    .then((data) => {
      pagingRef.value.complete(data)
    })
    .catch(() => {
      pagingRef.value.complete(false)
    })
}
</script>

<template>
  <div class="box-border min-h-100vh w100vw bg-#F2F3F7 px2.5">
    <NavBar bar-color="#fff">
      我的资产
    </NavBar>

    <div class="my2.5 box-border wf b-rd-1.25 bg-#fff p4.75">
      <div class="text-(3.5 #111827) fw500">
        总资产（元）
      </div>
      <div class="mb6 mt1.25 text-(9.5 #111827) fw500">
        {{ userInfo?.amount }}
      </div>
      <div class="wf f-c">
        <wd-button plain type="info" custom-class="flex-1! flex-shrink-0! mr2.75! h10!" @click="gotoPage('/pages-sub/amount/withdrawal')">
          提现
        </wd-button>
        <wd-button custom-class="flex-1! flex-shrink-0! h10! bg-#1E88E5!" @click="gotoPage('/pages-sub/amount/top-up')">
          充值
        </wd-button>
      </div>
    </div>

    <div class="mt3 wfull">
      <div class="mb2.5 text-3.75 fw500">
        资产明细
      </div>
      <div class="box-border wfull b-rd-2.5 bg-#fff p3">
        <wd-tabs v-model="activeTab" @change="tabChange">
          <block v-for="i in tabs" :key="i.type">
            <wd-tab :title="i.name" :name="i.type" />
          </block>
        </wd-tabs>

        <div class="h85 wfull">
          <z-paging
            ref="pagingRef"
            v-model="dataList"
            :fixed="false"
            :show-scrollbar="false"
            @query="queryList"
          >
            <div
              v-for="item in dataList"
              :key="item.id"
              class="box-border wfull f-c justify-between b-b-(1 solid) b-#677180/20 py3 last:b-0"
            >
              <div>
                <div class="text-3.5 text-#111827 fw500">
                  {{ item.title }}
                </div>
                <div class="text-(3 #A0AEC0)">
                  2025.06.09 15:20
                </div>
              </div>
              <div
                class="text-(3.75 #FF7252)"
                :class="[activeTab === 'in' && 'text-#5CC5A2!']"
              >
                +300
              </div>
            </div>
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
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
