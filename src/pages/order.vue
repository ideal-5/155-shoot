<script setup lang="ts">
import OrderList from './components/OrderList.vue'

const current = ref(0)
const tabList = ref([
  { label: '全部', id: 0 },
  { label: '待付款', id: 1 },
  { label: '已完成', id: 2 },
  { label: '已取消', id: 3 },
])

// swiper滑动结束
function swiperAnimationfinish(e: { detail: { current: number } }) {
  current.value = e.detail.current
}
</script>

<template>
  <!-- 使用z-paging-swiper为根节点可以免计算高度 -->
  <z-paging-swiper :swiper-style="{ backgroundColor: '#F2F3F7' }" :show-scrollbar="false">
    <template #top>
      <NavBar bar-color="#fff">
        我的订单
      </NavBar>
      <wd-tabs v-model="current">
        <block v-for="item in tabList" :key="item.id">
          <wd-tab :title="item.label" />
        </block>
      </wd-tabs>
    </template>
    <!-- swiper必须设置height:100%，因为swiper有默认的高度，只有设置高度100%才可以铺满页面  -->
    <swiper
      class="hf"
      :current="current"
      @animationfinish="swiperAnimationfinish"
    >
      <swiper-item
        v-for="(item, index) in tabList"
        :key="item.id"
        class="swiper-item"
      >
        <OrderList :tab-index="index" :current-index="current" />
      </swiper-item>
    </swiper>
  </z-paging-swiper>
</template>

<style scoped lang='scss'>

</style>
