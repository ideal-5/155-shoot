<script setup lang='ts'>
const { run } = useUpload()
function tapStart() {
  // run()
  gotoPage('/pages-sub/retouch/result')
}
</script>

<template>
  <div class="min-h100vh w100vw">
    <NavBar>旅图美化</NavBar>

    <image
      :src="`${IMAGE_BASE_URL}/bg/31.png`"
      mode="widthFix"
      class="fixed left-0 right-0 top-0 z1 wf"
    />

    <div class="relative z2 box-border wf px3.75">
      <div class="mb9 mt4.75 wf f-c-c">
        <image
          :src="`${IMAGE_BASE_URL}/bg/20.png`"
          mode="widthFix"
          class="w44.75"
        />
      </div>

      <div class="box-border wf b-rd-2.5 bg-#DBE0E5 p5">
        <WImage
          src="https://picsum.photos/200/150"
          custom-class="b-(#FAFAFC! 1! solid!) wf! b-rd-tl-6! b-rd-br-6! overflow-hidden"
          mode="widthFix"
        />
      </div>

      <!--  -->
      <div class="shadow-box mt11.5 box-border wf f-c flex-col b-rd-2.5 bg-#fff p5">
        <wd-button custom-class="bg-[linear-gradient(156deg,#AFA3F8_0%,#777BF6_100%)]! b-rd-3.5! wf! h16.25!" @click="tapStart">
          <div class="f-c text-(4.75 #FFFFFF) fw500">
            <image
              :src="`${IMAGE_BASE_URL}/icon/47.png`"
              class="mr3 size-5.75"
            />
            <span>开始美化</span>
          </div>
        </wd-button>
        <div class="mt3.75 text-(3.75 #375564)">
          智能美肤· 欢颜出彩
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.shadow-box {
  box-shadow: 0px 4px 6px 0px rgba(147, 147, 147, 0.3);
}
</style>
