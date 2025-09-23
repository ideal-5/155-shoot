<script setup lang='ts'>
const searchHistoryStore = useSearchHistoryStore()
const { searchHistory } = storeToRefs(searchHistoryStore)

const val = ref('')

async function tapSearch() {
  // const res = await uni.login()
  // console.log('res', res)
  if (val.value) {
    uni.navigateTo({
      url: `/pages-sub/scenic/search-result?keyword=${val.value}`,
      success: () => {
        searchHistoryStore.addSearchHistory(val.value)
      },
    })
  }
}

function tapHistoryItem(item: (typeof searchHistory.value)[number]) {
  val.value = item
  tapSearch()
}

const message = useMessage()
function tapDeleteAll() {
  message
    .confirm({
      title: '删除全部搜索历史?',
      confirmButtonText: '全部删除',
    })
    .then(() => {
      searchHistoryStore.deleteAllSearchHistory()
    })
    .catch(() => {})
}
</script>

<template>
  <div class="box-border w100vw px3.75">
    <NavBar>搜索</NavBar>

    <div class="wf">
      <!-- custom-input-class="h7.25!" -->
      <wd-search
        v-model="val"
        :maxlength="30"
        placeholder="你想要找些什么"
        custom-class="bg-transparent! p0!"
        @search="tapSearch"
      >
        <template #suffix>
          <wd-button custom-class="min-w-0! min-h-0 h7.25! ml2.75! bg-#1E88E5!" @click="tapSearch">
            搜索
          </wd-button>
        </template>
      </wd-search>
    </div>

    <div class="mb2.75 mt5 wf f-c justify-between text-(3 #A0AEC0)">
      <div>历史搜索</div>
      <div class="text-4 fw700" @click="tapDeleteAll">
        <i class="i-line-md:trash" />
      </div>
    </div>

    <div class="wf flex flex-wrap">
      <div
        v-for="(text, index) in searchHistory"
        :key="index"
        class="mb2 mr1.25 box-border max-w-full w-fit f-c b-rd-full bg-#F6F7F9 px2 py1 text-(3 #111827)"
        @click="tapHistoryItem(text)"
      >
        <div class="line-clamp-1 min-w-0 flex-1">
          {{ text }}
        </div>
        <div class="ml2 w5 flex-shrink-0" @click.stop="searchHistoryStore.deleteSearchHistory(text)">
          <i class="i-line-md:close" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
