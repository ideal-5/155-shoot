<script setup lang='ts'>
import type { AContext } from './context'
import { getCurrentInstance, provide, reactive, ref } from 'vue'
import { aContextKey } from './context'

interface Props {
  zIndex?: number
  transitionDuration?: number
  isShowMask?: boolean
  maskOpacity?: number
}
const props = withDefaults(defineProps<Props>(), {
  zIndex: 20,
  transitionDuration: 300,
  isShowMask: true,
  maskOpacity: 0.5,
})

const emit = defineEmits<{
  tapMask: [AContext['cancelFollow']]
}>()

const { SYSTEM } = storeToRefs(useSystemStore())

const isFollow = ref(false)
const isTransition = ref(false)
const isMask = ref(false)
const instance = getCurrentInstance()

const translateX = ref(0)
const translateY = ref(0)

const follow: AContext['follow'] = (distance, transitionCompleteCallback) => {
  if (isFollow.value) {
    return
  }
  const query = uni.createSelectorQuery().in(instance!.proxy)
  query
    .select('#follow-box-id')
    .boundingClientRect((data) => {
      if (!('bottom' in data)) {
        return
      }
      if (distance?.left != null) {
        translateX.value = distance.left - data.left
      }
      if (distance?.right != null) {
        translateX.value = distance.right - data.right
      }
      if (distance?.top != null) {
        translateY.value = distance.top - data.top
      }
      if (distance?.bottom != null) {
        const targetBottom = SYSTEM.value.screenHeight - distance.bottom
        translateY.value = targetBottom - data.bottom
      }
      isFollow.value = true
      isMask.value = true
      isTransition.value = true
      setTimeout(() => {
        isTransition.value = false
        if (transitionCompleteCallback) {
          transitionCompleteCallback()
        }
      }, props.transitionDuration)
    })
    .exec()
}

const cancelFollow: AContext['cancelFollow'] = (transitionCompleteCallback) => {
  translateX.value = 0
  translateY.value = 0
  isFollow.value = false
  isTransition.value = true
  isMask.value = false
  setTimeout(() => {
    isTransition.value = false
    if (transitionCompleteCallback) {
      transitionCompleteCallback()
    }
  }, props.transitionDuration)
}

const context = reactive<AContext>({
  follow,
  cancelFollow,
})

provide(aContextKey, context)

function tapMask() {
  emit('tapMask', cancelFollow)
}

defineExpose<{
  follow: AContext['follow']
  cancelFollow: AContext['cancelFollow']
}>({ follow, cancelFollow })
</script>

<template>
  <div
    v-if="props.isShowMask"
    class="fixed left-0 top-0 z-20 h-full w-full bg-black"
    :class="[isMask ? 'pointer-events-auto' : 'pointer-events-none']"
    :style="{
      zIndex: props.zIndex,
      opacity: isMask ? props.maskOpacity : 0,
      transitionDuration: `${props.transitionDuration}ms`,
    }"
    @click="tapMask"
  />
  <div
    id="follow-box-id"
    class="relative transition-transform ease-in-out"
    :style="[
      {
        transform: `translate(${translateX}px, ${translateY}px)`,
        transitionDuration: `${props.transitionDuration}ms`,
      },
      (isFollow || isTransition) && { zIndex: props.zIndex + 1, position: 'relative' },
    ]"
  >
    <slot />
  </div>
</template>
