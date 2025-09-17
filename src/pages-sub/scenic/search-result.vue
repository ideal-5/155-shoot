<script setup lang='ts'>
const val = ref('')
const pagingRef = ref<ZPagingRef>()

onLoad(async ({ keyword }) => {
  console.log('keyword', keyword)
  if (keyword) {
    val.value = keyword
  }
  await nextTick()
  pagingRef.value.reload()
})

const dataList = ref<Awaited<ReturnType<typeof getTestListApi>>>([])
const waterfallRef = ref()
async function queryList(pageNo: number, pageSize: number) {
  getTestListApi(pageNo, pageSize, 30000)
    .then((res) => {
      pagingRef.value.complete(res)
      waterfallRef.value.render(res, pageNo === 1)
    })
    .catch((_res) => {
      pagingRef.value.complete(false)
    })
}

function tapSearch() {
  pagingRef.value.reload()
}
</script>

<template>
  <z-paging
    ref="pagingRef"
    v-model="dataList"
    :paging-style="{ backgroundColor: '#F2F3F7' }"
    :auto="false"
    @query="queryList"
  >
    <template #top>
      <div class="box-border wf bg-#fff px3.75">
        <NavBar>搜索</NavBar>
        <div class="box-border wf py2.25">
          <!-- custom-input-class="h7.25!" -->
          <wd-search
            v-model="val"
            :maxlength="30"
            placeholder="你想要找些什么"
            custom-class="bg-transparent! p0!"
            @search="tapSearch"
            @clear="tapSearch"
          >
            <template #suffix>
              <wd-button custom-class="min-w-0! min-h-0 h7.25! ml2.75! bg-#1E88E5!" @click="tapSearch">
                搜索
              </wd-button>
            </template>
          </wd-search>
        </div>
      </div>
    </template>

    <div class="box-border wf px3.5">
      <waterfall
        ref="waterfallRef"
        :extra-height="84"
        img-key="img"
        class-name="grid grid-cols-2 gap-1"
        :list="dataList"
      >
        <template #item="{ item }">
          <div class="mb1 wf overflow-hidden b-rd-2.25 b-rd-tl-3 bg-#fff">
            <div class="relative h-fit wf f-c-c">
              <div class="absolute left-0 top-0 box-border h5.5 w22.75 f-c justify-between px1.5">
                <image
                  :src="`${IMAGE_BASE_URL}/bg/18.png`"
                  class="absolute inset-0 z1"
                />
                <div class="z2 text-(3.5 #fff) fw500">
                  5A
                </div>
                <div class="z2 text-(3 #fff) fw500">
                  名胜古迹
                </div>
              </div>
              <WImage
                :src="item.img"
                mode="widthFix"
                custom-class="wf!"
              />
            </div>
            <div class="box-border h20 wf p2.5">
              <div class="line-clamp-1 mb1.25 wf text-(3.75 #111827) fw500">
                {{ item.title }}
              </div>
              <div class="line-clamp-2 wf text-(3 #A0AEC0)">
                {{ item.text }}
              </div>
            </div>
          </div>
        </template>
      </waterfall>
    </div>

    <!-- 骨架屏 -->
    <template #loading>
      <Loading />
    </template>
    <!-- 下拉刷新  -->
    <template #refresher="{ refresherStatus }">
      <LotRefresh :status="refresherStatus" />
    </template>
    <!-- 底部的加载中 -->
    <template #loadingMoreLoading>
      <LotLoading />
    </template>
    <template #loadingMoreNoMore>
      <LotNoMore />
    </template>
    <template #loadingMoreFail>
      <LotErr />
    </template>
  </z-paging>
</template>

<style scoped lang='scss'>

</style>
