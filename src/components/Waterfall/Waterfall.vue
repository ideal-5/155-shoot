<script setup lang='ts' generic="T extends Record<string, string>">
// #ifdef MP-WEIXIN
// 将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
defineOptions({
  virtualHost: true,
})
const props = withDefaults(defineProps<{
  columns?: number
  imgKey: keyof T
  list: T[]
  className?: string
}>(), {
  columns: 2,
})

// #endif

const columnList = ref<{ height: number, list: T[] }[]>(Array.from({ length: props.columns }, () => ({
  height: 0,
  list: [],
})))

const temList = ref<T[]>()
function render(list: T[], reset = false) {
  if (reset) {
    columnList.value.forEach((item) => {
      item.height = 0
      item.list = []
    })
  }
  temList.value = list
}

function imgOnLoad(e: { width: number | string, height: number | string }, ind: number, item: T) {
  const minIndex = columnList.value.reduce((pre, cur, index) => {
    return cur.height < columnList.value[pre].height ? index : pre
  }, 0);
  (columnList.value[minIndex].list as T[]).push(item)
  columnList.value[minIndex].height += Number(e.height)
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
      @load="imgOnLoad({ width: $event.detail.width, height: $event.detail.height }, ind, item)"
    />
  </div>
  <div class="wf flex" :class="[className]">
    <div v-for="(column, index) in columnList" :key="index" class="flex-1 flex-shrink-0">
      <template v-for="(item, ind) in column.list" :key="ind">
        <slot name="item" :item="item" :column-index="index" :index="ind" />
      </template>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
