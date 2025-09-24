<script setup lang='ts'>
import { amountCreateOrderApi } from '@/api'

const { bottomStyle } = useStyle().absoluteBottom(120)

const { userInfo } = storeToRefs(useUserStore())
const toast = useToast()

const topUpList = ref([100, 200, 300, 400, 500])
const activeCount = ref(100)

const custom = ref(false)
const customCount = ref(null)

watch(() => activeCount.value, (n) => {
  if (n) {
    custom.value = false
    customCount.value = null
  }
})

function tapCustom() {
  custom.value = true
  activeCount.value = null
}

async function tapUp() {
  const amount = Number(custom.value ? customCount.value : activeCount.value)

  if (!Number.isFinite(amount)) {
    toast.warning('请输入合法的金额')
    return
  }
  if (amount < 1) {
    toast.warning('金额必须大于 1')
    return
  }
  const { data, code, msg } = await amountCreateOrderApi(amount)
  if (code !== 1) {
    toast.error(msg)
    return
  }
  console.log('下单', data)
}
</script>

<template>
  <div class="box-border min-h100vh w100vw bg-#F7F7F7 px3.75">
    <NavBar bar-color="#fff">
      充值
    </NavBar>

    <div class="my3.75 box-border wf f-c-c flex-col b-rd-2 bg-#1E88E5 py3.75 text-#fff fw500">
      <div class="mb1.25 text-3">
        我的余额
      </div>
      <div class="text-8.75">
        {{ userInfo?.amount }}
      </div>
    </div>

    <div class="mb3.75 text-(3.75 #111827) fw500">
      账号充值
    </div>

    <div class="grid grid-cols-2 wf gap5">
      <div
        v-for="count in topUpList"
        :key="count"
        class="h14.25 wf f-c-c b-(1 #D6D6D6 rd-1.25 solid) bg-#fff transition-all"
        :class="[activeCount === count && 'bg-#1E88E5! text-#fff b-#1E88E5!']"
        @click="activeCount = count"
      >
        <div>
          <span class="text-4 fw500">{{ count }}</span>
          <span class="text-2.75">元</span>
        </div>
      </div>

      <div
        class="h14.25 wf f-c-c b-(1 #D6D6D6 rd-1.25 solid) bg-#fff transition-all"
        :class="[custom && ' b-#1E88E5!']"
        @click="tapCustom"
      >
        <wd-input
          v-model="customCount"
          no-border
          custom-input-class="text-center!"
          type="number"
          placeholder="自定义金额"
          placeholder-class="text-(4! #111827!)"
        />
      </div>
    </div>

    <div :style="bottomStyle" class="box-border f-c-c px3.75">
      <wd-button custom-class="h10.5! wf! bg-#1E88E5! text-(3.75!) fw500!" @click="tapUp">
        立即充值
      </wd-button>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
