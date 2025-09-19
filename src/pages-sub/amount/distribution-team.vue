<script setup lang='ts'>

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
            获得积分
          </div>
          <div class="text-6.5">
            2689
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

    <div v-for="i in 5" :key="i" class="mt5 box-border wf px3.75">
      <div class="wf f-c">
        <WImage custom-class="size-12.5! b-rd-full! overflow-hidden!" src="https://dummyimage.com/600x400/000/fff" />
        <div class="ml3.75">
          <div class="text-(3.5 #222222) fw500">
            闪闪小星星
          </div>
          <div class="text-(3 #666666) fw500">
            邀请时间:2023-08-27 15:34
          </div>
        </div>
      </div>
      <div class="mt4.75 box-border wf b-rd-2 bg-#F5F5F5 px4.75 py3.25">
        <div>
          <span class="text-(3 #333333)">贡献收益:</span>
          <span class="text-(3.5 #D94A3B) fw500">￥200</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
