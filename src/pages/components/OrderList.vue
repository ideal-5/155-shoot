<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  tabIndex: number
  currentIndex: number
}

const props = defineProps<Props>()

type OrderList = Awaited<ReturnType<typeof getTestListApi>>

const paging = ref(null)
const dataList = ref<OrderList>([])
// 当前组件是否已经加载过了
const firstLoaded = ref(false)
// 是否滚动到当前页
const isCurrentPage = ref(false)

watch(() => props.currentIndex, (newVal) => {
  if (newVal === props.tabIndex) {
    // 懒加载，当滑动到当前的item时，才去加载
    if (!firstLoaded.value) {
      // 这里需要延迟渲染z-paging的原因是为了避免在一些平台上立即渲染可能引发的底层报错问题
      setTimeout(() => {
        isCurrentPage.value = true
      }, 100)
    }
  }
}, {
  immediate: true,
})

function queryList(pageNo: number, pageSize: number) {
  getTestListApi(pageNo, pageSize).then((res) => {
    paging.value.complete(res)
    firstLoaded.value = true
  }).catch(() => {
    paging.value.complete(false)
  })
}
</script>

<template>
  <view class="hf">
    <z-paging
      v-if="firstLoaded || isCurrentPage"
      ref="paging"
      v-model="dataList"
      :fixed="false"
      :enable-back-to-top="currentIndex === tabIndex"
      :show-scrollbar="false"
      @query="queryList"
    >
      <div class="box-border wf px3.75">
        <div v-for="item in dataList" :key="item.id" class="mt3 box-border wf b-rd-2 bg-#fff py2">
          <div class="box-border wf f-c justify-between b-b-(1 #F2F3F7 solid) px3 py2">
            <div class="text-(3 #111827) fw500">
              已完成
            </div>
            <div class="text-(2.75 #A0AEC0)">
              2024-08-11 17:13:45
            </div>
          </div>

          <div class="box-border wf px3 py2">
            <div class="wf f-c">
              <WImage
                src="https://dummyimage.com/600x400/000/fff"
                custom-class="w18.5! h13.25! b-rd-1.25! mr2.75! flex-shrink-0! overflow-hidden!"
              />
              <div class="line-clamp-1 min-w-0 flex-1 text-(3 #111827) fw500">
                西安秦始皇兵马俑西安秦始皇兵马俑西安秦始皇兵马俑西安秦始皇兵马俑西安秦始皇兵马俑西安秦始皇兵马俑西安秦始皇兵马俑
              </div>
            </div>

            <div class="mt1.5 flex justify-end">
              <div>
                <span class="text-(2.5 #A0AEC0) fw500">实收：</span>
                <span class="text-(3.75 #111827)">￥9.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 骨架屏 -->
      <template #loading>
        <Loading :columns="1" :for-count="8" :row-col="[[{ width: '100%', height: '128px' }]]" />
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
  </view>
</template>

<style>
.item {
  position: relative;
  height: 150rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rpx 30rpx;
}

.item-detail {
  padding: 5rpx 15rpx;
  border-radius: 10rpx;
  font-size: 28rpx;
  color: white;
  background-color: #007aff;
}

.item-line {
  position: absolute;
  bottom: 0rpx;
  left: 0rpx;
  height: 1px;
  width: 100%;
  background-color: #eeeeee;
}
</style>
