<script setup lang='ts'>
import type { AContext } from './context'
import { aContextKey } from './context'

defineOptions({
  options: {
    virtualHost: true,
  },
})
const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  followCallback: []
  cancelFollowCallback: []
}>()

const isFollow = defineModel<boolean>('isFollow')
interface Props {
  distance: Parameters<AContext['follow']>[0]
}
// 注入父组件提供的 context
const context = inject<AContext>(aContextKey)
watch(() => isFollow.value, (n) => {
  if (n) {
    context.follow(props.distance, () => {
      emit('followCallback')
    })
  }
  else {
    context.cancelFollow(() => {
      emit('cancelFollowCallback')
    })
  }
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
