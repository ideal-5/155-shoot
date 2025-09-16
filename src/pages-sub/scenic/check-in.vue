<script setup lang='ts'>
const { bottomHeightNum, bottomStyle } = useStyle().absoluteBottom(120)

onLoad(({ id }) => {
  console.log('id', id)
})
const images = ref<string[]>(['https://dummyimage.com/600x400/000/fff'])
function deleteImage(index: number) {
  images.value.splice(index, 1)
}

async function selectImage() {
  // 456
}
</script>

<template>
  <div class="min-h100vh w100vw" :style="{ paddingBottom: `${bottomHeightNum + 20}px` }">
    <NavBar>打卡</NavBar>
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

    <div class="box-border wf px3.75">
      <div class="mb3.75 mt3 wf">
        <span class="mr1 text-(4 #111827) fw500">上传打卡照片</span>
        <span class="text-(3 #A0AEC0)">最多上传6张</span>
      </div>

      <div class="grid grid-cols-3 mt5 wf gap2">
        <div v-for="(img, index) in images" :key="index" class="relative aspect-1/1 wf overflow-hidden b-rd-1">
          <div class="absolute right-0 top-0 z10 size-5 f-c-c b-rd-bl-1 bg-#000/50 text-#fff" @click="deleteImage(index)">
            <i class="i-carbon:close-large" />
          </div>
          <WImage custom-class="size-full!" :src="img" />
        </div>
        <div v-if="images.length < 6" class="aspect-1/1 wf" @click="selectImage">
          <image
            :src="`${IMAGE_BASE_URL}/bg/13.png`"
            class="size-full"
          />
        </div>
      </div>
    </div>

    <div :style="bottomStyle" class="box-border f-c-c bg-#fff px4.5">
      <wd-button custom-class="wf! h11! bg-#1E88E5!" @click="gotoPage('/pages-sub/scenic/check-in-hint', { id: '5' })">
        完成打卡
      </wd-button>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
