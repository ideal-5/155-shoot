import { defineStore } from 'pinia'

export const useSearchHistoryStore = defineStore('searchHistory', () => {
  const searchHistory = ref<string[]>([])

  const addSearchHistory = (keyword: string) => {
    const index = searchHistory.value.findIndex(text => text === keyword)
    if (index !== -1) {
      searchHistory.value.splice(index, 1)
    }
    // 最多可存储几个
    if (searchHistory.value.length >= 25) {
      searchHistory.value.splice(searchHistory.value.length - 1, 1)
    }
    searchHistory.value.unshift(keyword)
  }

  const deleteSearchHistory = (keyword: string) => {
    const index = searchHistory.value.findIndex(text => text === keyword)
    if (index !== -1) {
      searchHistory.value.splice(index, 1)
    }
  }

  const deleteAllSearchHistory = () => {
    searchHistory.value = []
  }

  return {
    searchHistory,
    addSearchHistory,
    deleteSearchHistory,
    deleteAllSearchHistory,
  }
}, {
  persist: true,
})
