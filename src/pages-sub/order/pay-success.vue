<script setup lang='ts'>

</script>

<template>
  <div class="w100vw f-c flex-col">
    <NavBar>提示</NavBar>

    <image
      :src="`${IMAGE_BASE_URL}/icon/40.png`"
      class="mb1.5 mt5 size-7.75"
    />
    <div class="text-(4.5 #111827)">
      支付成功
    </div>
    <div class="mb4 mt3.25 text-(3 #A0AEC0)">
      可在 我的-我的视频 里查看
    </div>
    <div class="text-(8.75 #111827) fw700">
      <span class="text-6.5">￥</span>
      <span>6.00</span>
    </div>

    <div class="mt5.5 box-border wf px3.75">
      <div class="mb2.25 f-c justify-between text-(3.25 #111827)">
        <div>订单编号</div>
        <div class="text-#1E88E5 underline decoration-#1E88E5 underline-offset-2 decoration-dashed">
          HJW1542755
        </div>
      </div>

      <div class="mb2.25 f-c justify-between text-(3.25 #111827)">
        <div>支付方式</div>
        <div class="f-c">
          <!-- 44 -->
          <image
            :src="`${IMAGE_BASE_URL}/icon/32.png`"
            class="mr1.5 size-5.5"
          />
          <div>微信支付</div>
        </div>
      </div>

      <div class="mb2.25 f-c justify-between text-(3.25 #111827)">
        <div>优惠券</div>
        <div class="text-#FF594D">
          -10￥
        </div>
      </div>
    </div>

    <div class="mt16.75 f-c flex-col">
      <wd-button custom-class="bg-#1E88E5! w44! h11! text-(3.75!) fw500! mb4.5!">
        我知道了
      </wd-button>
      <wd-button custom-class=" w44! h11! text-(3.75!) fw500!" type="info" plain>
        去查看
      </wd-button>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
