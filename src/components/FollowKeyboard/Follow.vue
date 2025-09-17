<script setup lang='ts'>
import type { AContext } from './context'
import { getCurrentInstance, provide, reactive, ref } from 'vue'
import { aContextKey } from './context'

interface Props {
  zIndex?: number
  transitionDuration?: number
  isShowMask?: boolean
  maskOpacity?: number
  /**
   * 动画状态是否脱离文档流
   */
  isLeaveDocument?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  zIndex: 20,
  transitionDuration: 300,
  isShowMask: true,
  maskOpacity: 0.5,
  isLeaveDocument: false,
})

const emit = defineEmits<{
  tapMask: [AContext['cancelFollow']]
}>()

const { SYSTEM } = storeToRefs(useSystemStore())

const isFollow = ref(false)
const isFollowTransition = ref(false) // 是否正在移动过度中
const isCancelFollowTransition = ref(false) // 是否正在归位移动过度中
const isMask = ref(false)
const instance = getCurrentInstance()

const domCoordinates = ref({ left: 0, top: 0 })
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
        domCoordinates.value.left = data.left
        translateX.value = distance.left - data.left
      }
      if (distance?.right != null) {
        translateX.value = distance.right - data.right
      }
      if (distance?.top != null) {
        domCoordinates.value.top = data.top
        translateY.value = distance.top - data.top
      }
      if (distance?.bottom != null) {
        const targetBottom = SYSTEM.value.screenHeight - distance.bottom
        translateY.value = targetBottom - data.bottom
      }
      isFollow.value = true
      isMask.value = true
      isFollowTransition.value = true
      setTimeout(() => {
        isFollowTransition.value = false
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
  isCancelFollowTransition.value = true
  isMask.value = false
  setTimeout(() => {
    isCancelFollowTransition.value = false
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
    class="transition-transform ease-in-out"
    :class="[(props.isLeaveDocument && (isFollow || isCancelFollowTransition)) ? 'fixed' : 'relative']"
    :style="[
      {
        transform: `translate(${translateX}px, ${translateY}px)`,
        transitionDuration: `${props.transitionDuration}ms`,
      },
      (isFollow || isFollowTransition || isCancelFollowTransition) && { zIndex: props.zIndex + 1 },
      (props.isLeaveDocument && (isFollow || isCancelFollowTransition)) && { top: `${domCoordinates.top}px`, left: `${domCoordinates.left}px` },
    ]"
  >
    <slot />
  </div>
</template>
