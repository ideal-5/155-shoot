<script setup lang='ts' generic="T extends Record<string, any>">
import { getCurrentInstance } from 'vue'
// #ifdef MP-WEIXIN
// 将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
defineOptions({
  virtualHost: true,
})
// #endif
const props = withDefaults(defineProps<{
  columns?: number
  imgKey: keyof T
  list: T[]
  className?: string
  /**
   * 除了图片之前的其他高度，方便更精准的分配列
   * 也包括上下边距
   */
  extraHeight: number
}>(), {
  columns: 2,
})

const columnList = ref<{ height: number, list: T[] }[]>(Array.from({ length: props.columns }, () => ({
  height: 0,
  list: [],
})))

const temList = ref<T[]>()
const columnWidth = ref(0)
async function render(list: T[], reset = false) {
  if (!columnWidth.value) {
    await nextTick()
    await getColumnWidth()
  }
  if (reset) {
    columnList.value.forEach((item) => {
      item.height = 0
      item.list = []
    })
  }
  temList.value = list
}
onMounted(() => {
  getColumnWidth()
})

const instance = getCurrentInstance()
function getColumnWidth() {
  return new Promise<number>((resolve) => {
    const query = uni.createSelectorQuery().in(instance.proxy)
    query
      .select(`#column`)
      .boundingClientRect((data) => {
        if (Array.isArray(data)) {
          columnWidth.value = data[0].width
          resolve(data[0].width)
        }
        else {
          columnWidth.value = data.width
          resolve(data.width)
        }
      })
      .exec()
  })
}

function imgOnLoad(e: { width: number, height: number }, ind: number, item: T) {
  const height = Math.round((e.height / e.width) * columnWidth.value)

  const minIndex = columnList.value.reduce((pre, cur, index) => {
    return cur.height < columnList.value[pre].height ? index : pre
  }, 0);
  (columnList.value[minIndex].list as T[]).push(item)
  columnList.value[minIndex].height = columnList.value[minIndex].height + height + props.extraHeight
  // console.log('columnList.value', columnList.value[0].height, columnList.value[1].height, height)
}

defineExpose<{ render: (value: T[]) => void }>({ render })
</script>

<template>
  <div class="fixed opacity-0 -left-100 -top-100">
    <image
      v-for="(item, ind) in temList"
      :key="ind"
      :src="item[props.imgKey]"
      mode="widthFix"
      class="w0.25"
      @load="imgOnLoad({ width: Number($event.detail.width), height: Number($event.detail.height) }, ind, item)"
    />
  </div>
  <div class="wf flex" :class="[className]">
    <div
      v-for="(column, index) in columnList"
      id="column"
      :key="index"
      class="flex-1 flex-shrink-0"
    >
      <template v-for="(item, ind) in column.list" :key="ind">
        <slot name="item" :item="item" :column-index="index" :index="ind" />
      </template>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
