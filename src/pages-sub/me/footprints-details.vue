<script setup lang='ts'>
import { getScenicFootprintDetailApi } from '@/api'

type Detail = Awaited<ReturnType<typeof getScenicFootprintDetailApi>>['data'] & { imgList: string[] }

const detail = ref<Detail>()

onLoad(async ({ id }) => {
  const { data } = await getScenicFootprintDetailApi(id)
  detail.value = { ...data, imgList: data.imgs.split(',') }
})
</script>

<template>
  <div class="min-h-100vh w100vw">
    <NavBar bar-color="#fff">
      我的足迹
    </NavBar>
    <div
      class="mt3 box-border wf flex b-rd-2.5 px3.75 py3"
    >
      <WImage custom-class="size-21.25! b-rd-1.25! overflow-hidden flex-shrink-0!" :src="detail?.areaInfo?.img" />
      <div class="ml2.5 box-border h21.25 min-w0 flex flex-1 flex-col justify-between">
        <div class="line-clamp-2">
          <span class="mr1.5 text-(3.75 #111827) fw500">{{ detail?.areaInfo?.title }}</span>
          <span class="box-border b-rd-0.5 bg-#F1F1FE px1.75 py0.5 text-(3 #3C6292)">{{ detail?.areaInfo?.type }}A</span>
        </div>
        <div class="box-border w-fit b-(1 #E7E7E7 rd-0.25 solid) px1.75 py0.5 text-(2.5 #525456)">
          {{ detail?.areaInfo?.tag }}
        </div>
        <div class="line-clamp-2 text-(3 #A0AEC0)">
          {{ detail?.areaInfo?.content }}
        </div>
      </div>
    </div>

    <div class="h2.5 wf bg-#F5F7FB" />

    <div class="grid grid-cols-2 box-border wf gap1 px3.5 pt3">
      <template v-for="(url, ind) in detail?.imgList" :key="ind">
        <WImage enable-preview custom-class="wf! aspect-1/1! overflow-hidden! b-rd-2!" :src="url" />
      </template>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
