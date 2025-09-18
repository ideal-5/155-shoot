<script setup lang='ts'>
const { bottomHeightNum, bottomStyle } = useStyle().absoluteBottom(120)

onLoad(({ id }) => {
  console.log('id', id)
})
</script>

<template>
  <div class="min-h100vh w100vw bg-#F6F6F6">
    <NavBar>订单详情</NavBar>
    <div class="relative z1 wf">
      <image
        :src="`${IMAGE_BASE_URL}/bg/15.png`"
        mode="widthFix"
        class="wf"
      />
      <div
        class="absolute left-50% top-30% text-(6.25 #fff) fw500"
        style="transform: translateX(-50%);"
      >
        待支付
      </div>
    </div>
    <div class="relative z2 box-border wf px2.5 -mt4.5">
      <div class="box-border wf b-rd-2 bg-#fff px3.75">
        <div class="box-border h20 flex py2">
          <div class="mr2.5 hf w20 flex-shrink-0 b-rd-1.25 bg-red" />
          <div class="hf min-w-0 flex flex-1 flex-col justify-between">
            <div class="text-(3.75 #111827) fw500">
              西安秦始皇兵马俑
            </div>
            <div class="text-(2.5 #E9445A) fw700">
              <span>￥</span>
              <span class="text-4.5">19.9</span>
            </div>
          </div>
        </div>

        <div class="box-border wf flex justify-between py1.5">
          <div class="text-(3 #111827)">
            优惠券
          </div>
          <div class="text-(3 #677180)">
            -10￥
          </div>
        </div>

        <div class="box-border wf flex justify-between py1.5">
          <div class="text-(3 #111827)">
            商品总价
          </div>
          <div class="text-(3 #E54343)">
            <span>￥</span>
            <span class="text-3.75">19.90</span>
          </div>
        </div>

        <div class="mt1.5 box-border wf f-c justify-end b-t-(1 #F7F7F7 solid) py3">
          <div class="text-(3 #E54343)">
            <span class="text-#111827">合计：</span>
            <span>￥</span>
            <span class="text-3.5">9.90</span>
          </div>
        </div>
      </div>

      <div class="mt2.5 box-border wf b-rd-2 bg-#fff px2.5 py2">
        <div class="box-border wf flex py2">
          <div class="mr2.5 w-fit flex-shrink-0 text-(3.5 #677180)">
            订单编号
          </div>
          <div class="line-clamp-1 min-w-0 flex-1 text-(3.5 #1E88E5) underline decoration-#1E88E5 underline-offset-2 decoration-dashed">
            53652365563211
          </div>
        </div>

        <div class="box-border wf flex py2">
          <div class="mr2.5 w-fit flex-shrink-0 text-(3.5 #677180)">
            支付渠道
          </div>
          <div class="line-clamp-1 min-w-0 flex-1 text-(3.5 #111827)">
            微信支付
          </div>
        </div>

        <div class="box-border wf flex py2">
          <div class="mr2.5 w-fit flex-shrink-0 text-(3.5 #677180)">
            下单时间
          </div>
          <div class="line-clamp-1 min-w-0 flex-1 text-(3.5 #111827)">
            2022-10-15 15:25:32
          </div>
        </div>
      </div>
    </div>

    <div class="box-border f-c justify-end bg-#fff px2" :style="bottomStyle">
      <wd-button custom-class="w28! h9.5! mr2.25!" type="info" plain>
        取消订单
      </wd-button>
      <wd-button custom-class="w28! h9.5! bg-#1E88E5 mr2.25!">
        立即支付
      </wd-button>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
