<script setup lang='ts'>

</script>

<template>
  <div class="min-h-100vh w100vw bg-[linear-gradient(to_bottom,#1E88E5,#F2F3F7_610rpx)]">
    <NavBar />
    <div class="my3.5 box-border wf f-c px5">
      <WImage
        custom-class="size-7! overflow-hidden! b-rd-full! mr1.25!"
        src="https://picsum.photos/200/300"
      />
      <div class="text-(3.75 #fff) fw500">
        温润小队长
      </div>
    </div>

    <div class="box-border wf px5">
      <div class="box-border wf flex b-rd-2 bg-#fff py6">
        <div class="box-border min-w-0 flex-1 flex-shrink-0 pl5.5">
          <div class="mb1.5 text-(3 #111827) fw500">
            获得收益
          </div>
          <div class="text-(6.5 #000000)">
            2689
          </div>
        </div>
        <div class="box-border min-w-0 flex-1 flex-shrink-0 pl5.5">
          <div class="mb1.5 f-c text-(3 #111827) fw500">
            <span>我的团队</span>
            <i class="i-line-md:chevron-small-right" />
          </div>
          <div class="text-(6.5 #000000)">
            70
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

      <div class="mt2.5 box-border wf b-rd-1.5 bg-#fff px3 py2.5">
        <div class="wf f-c justify-between text-(3 #333333) fw500">
          <div class="f-c">
            <WImage src="https://dummyimage.com/600x400/000/fff" custom-class="size-5.5! overflow-hidden! b-rd-full! mr1.25!" />
            <div>
              用户名称
            </div>
          </div>
          <div>2023/02/15</div>
        </div>

        <div class="mt2.75 wf f-c justify-between">
          <div class="text-(4.25 #333333) fw500">
            用户消费
          </div>
          <div>
            <span class="text-(3 #333333)">获得收益:</span>
            <span class="text-(3.5 #D94A3B) fw500">+200</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
