<script setup lang='ts'>
import type { AContext } from './context'
import { aContextKey } from './context'

defineOptions({
  options: {
    // 微信小程序中 options 选项
    multipleSlots: true, //  在组件定义时的选项中启动多slot支持，默认启用
    styleIsolation: 'isolated', //  启动样式隔离。当使用页面自定义组件，希望父组件影响子组件样式时可能需要配置。具体配置选项参见：微信小程序自定义组件的样式
    addGlobalClass: true, //  表示页面样式将影响到自定义组件，但自定义组件中指定的样式不会影响页面。这个选项等价于设置 styleIsolation: apply-shared
    virtualHost: true, //  将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定
  },
})
const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
})
const modelValue = defineModel<string | number>()
// const attrs = useAttrs()
// console.log('attrs', attrs) // 在小程序中 只有属性，没有事件
// 所以需要手动写事件
const emit = defineEmits<{
  input: []
  focus: []
}>()
interface Props {
  placeholder?: string
}

const { safeAreaInsets } = storeToRefs(useSystemStore())
// 注入父组件提供的 context
const context = inject<AContext>(aContextKey)

const slots = useSlots()

const placeholder = ref(props.placeholder)

function onFocus({ height }: { height: number }) {
  placeholder.value = ''
  context.follow({ bottom: height + 10 + safeAreaInsets.value.bottom }, () => {
    placeholder.value = props.placeholder
  })
  emit('focus')
}
function onBlur() {
  placeholder.value = props.placeholder
  context.cancelFollow()
  emit('input')
}

// function updateHeight(res: UniApp.OnKeyboardHeightChangeResult) {
//   console.log('res.height变化', res.height)
//   if (res.height > 0) {
//     context.follow({ bottom: res.height + 15 })
//   }
// }

// onMounted(() => {
//   if (uni.onKeyboardHeightChange) {
//     uni.onKeyboardHeightChange(updateHeight)
//   }
// })

// onUnmounted(() => {
//   if (uni.offKeyboardHeightChange) {
//     uni.offKeyboardHeightChange(updateHeight)
//   }
// })
</script>

<template>
  <!-- @focus="onFocus" @blur="onBlur" -->
  <wd-input
    v-bind="$attrs"
    :placeholder="placeholder"
    :adjust-position="false"
    caret-color="red"
    style="caret-color: red;"
    @focus="onFocus"
    @blur="onBlur"
    v-model="modelValue"
  >
    <template v-for="(_slotContent, slotName) in slots" :key="slotName">
      <slot :name="slotName" />
    </template>
  </wd-input>
</template>
