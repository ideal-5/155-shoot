<script setup lang='ts'>
import { getScenicDetailApi, postScenicSignApi } from '@/api'

const { bottomHeightNum, bottomStyle } = useStyle().absoluteBottom(120)

const detail = ref<Awaited<ReturnType<typeof getScenicDetailApi>>['data']>()

onLoad(async ({ id }) => {
  const { data } = await getScenicDetailApi({ id })
  detail.value = data
})

const images = ref<string[]>([])
function deleteImage(index: number) {
  images.value.splice(index, 1)
}

const { selectImage, uploadImgs } = useUploadImg()
const toast = useToast()
async function tapSelectImage() {
  try {
    const count = 6 - images.value.length
    const imgs = await selectImage(count)
    const res = await uploadImgs(imgs.tempFiles.map(item => item.tempFilePath))
    images.value.push(...res.map(i => i.url))
  }
  catch (error) {
    toast.error('图片上传失败')
  }
}

async function tapCheckIn() {
  if (images.value.length < 1) {
    toast.warning('请上传图片')
    return
  }
  const { code } = await postScenicSignApi({ img_str: images.value.join(','), id: detail.value?.id })
  if (code === 1) {
    uni.redirectTo({
      url: '/pages-sub/scenic/check-in-hint',
    })
  }
}
</script>

<template>
  <div class="min-h100vh w100vw" :style="{ paddingBottom: `${bottomHeightNum + 20}px` }">
    <NavBar>打卡</NavBar>
    <div
      class="mt3 box-border wf flex b-rd-2.5 px3.75 py3"
    >
      <WImage custom-class="size-21.25! b-rd-1.25! overflow-hidden flex-shrink-0!" :src="detail?.img" />
      <div class="ml2.5 box-border h21.25 min-w0 flex flex-1 flex-col justify-between">
        <div class="line-clamp-2">
          <span class="mr1.5 text-(3.75 #111827) fw500">{{ detail?.title }}</span>
          <span class="box-border b-rd-0.5 bg-#F1F1FE px1.75 py0.5 text-(3 #3C6292)">{{ detail?.type }}A</span>
        </div>
        <div class="box-border w-fit b-(1 #E7E7E7 rd-0.25 solid) px1.75 py0.5 text-(2.5 #525456)">
          {{ detail?.tag }}
        </div>
        <div class="line-clamp-2 text-(3 #A0AEC0)">
          {{ detail?.content }}
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
        <div v-if="images.length < 6" class="aspect-1/1 wf" @click="tapSelectImage">
          <image
            :src="`${IMAGE_BASE_URL}/bg/13.png`"
            class="size-full"
          />
        </div>
      </div>
    </div>

    <div :style="bottomStyle" class="box-border f-c-c bg-#fff px4.5">
      <wd-button custom-class="wf! h11! bg-#1E88E5!" @click="tapCheckIn">
        完成打卡
      </wd-button>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
