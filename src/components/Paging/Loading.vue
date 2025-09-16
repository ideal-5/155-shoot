<script setup lang='ts'>
import type { SkeletonProps } from 'wot-design-uni/components/wd-skeleton/types'

interface Props {
  columns?: number
  rowCol?: SkeletonProps['rowCol']
  forCount?: number
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  columns: 2,
  rowCol: () => [[{ width: '100%', height: '200px' }], [{ width: '100%', height: '16px' }], [{ width: '100%', height: '16px' }]],
  forCount: 4,
})
</script>

<template>
  <div class="grid grid-cols-2 wf" :class="className">
    <div v-for="i in props.forCount" :key="i" class="my3 box-border wf px3.75">
      <wd-skeleton
        animation="gradient"
        :row-col="props.rowCol"
      />
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
