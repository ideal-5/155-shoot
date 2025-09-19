<script setup lang='ts'>

</script>

<template>
  <div class="min-h-100vh w100vw">
    <NavBar bar-color="#fff">
      我的足迹
    </NavBar>
    <div
      class="mt3 box-border wf flex b-rd-2.5 px3.75 py3"
    >
      <WImage custom-class="size-21.25! b-rd-1.25! overflow-hidden flex-shrink-0!" src="https://dummyimage.com/600x600/004643/fff" />
      <div class="ml2.5 box-border h21.25 min-w0 flex flex-1 flex-col justify-between">
        <div class="line-clamp-2">
          <span class="mr1.5 text-(3.75 #111827) fw500">石林景区</span>
          <span class="box-border b-rd-0.5 bg-#F1F1FE px1.75 py0.5 text-(3 #3C6292)">5A</span>
        </div>
        <div class="box-border w-fit b-(1 #E7E7E7 rd-0.25 solid) px1.75 py0.5 text-(2.5 #525456)">
          自然风光
        </div>
        <div class="line-clamp-2 text-(3 #A0AEC0)">
          这是文字内容，字色#A0AEC0。这是文字内容，字色#A0AEC0。这是文字内容，字色这是文字内容，字色#A0AEC0。这是文字内容，字色#A0AEC0。这是文字内容，字色...
        </div>
      </div>
    </div>

    <div class="h2.5 wf bg-#F5F7FB" />

    <div class="grid grid-cols-2 box-border wf gap1 px3.5 pt3">
      <template v-for="i in 7" :key="i">
        <WImage custom-class="wf! aspect-1/1! overflow-hidden! b-rd-2!" src="https://dummyimage.com/600x400/000/fff" />
      </template>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
