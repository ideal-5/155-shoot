<script setup lang="ts">
const { bottomStyle, bottomHeightNum } = useStyle().absoluteBottom(150)

const issueList = ref([
  { content: '功能问题', isSelect: false },
  { content: '闪退卡顿', isSelect: false },
  { content: '操作异常', isSelect: false },
  { content: '其他', isSelect: false },
])

const phone = ref('')

const suggest = ref('')

const imageList = ref<string[]>([])

async function uploadImg() {
  if (imageList.value.length >= 4)
    return
}

const toast = useToast()
async function submit() {
  const reasonList = issueList.value.filter(i => i.isSelect)
  if (reasonList.length === 0 || !suggest.value || !phone.value) {
    toast.warning('请填写完整')
    return
  }

  // const { code, msg } = await configFeedbackApi({
  //   reason: issueList.value
  //     .filter(i => i.isSelect)
  //     .map(i => i.content)
  //     .join(','),
  //   suggest: suggest.value,
  //   phone: phone.value,
  //   imageList: imageList.value.join(','),
  // })
  // toast[code === 200 ? 'success' : 'warning'](msg)
  // if (code === 200) {
  //   uni.navigateBack()
  // }
}
</script>

<template>
  <div
    class="box-border min-h100vh w100vw bg-#F7F7F7"
    :style="{ paddingBottom: `${bottomHeightNum + 20}rpx` }"
  >
    <NavBar bar-color="#fff">
      意见反馈
    </NavBar>

    <div class="box-border wf px4">
      <div class="card">
        <div
          v-for="(item, i) in issueList"
          :key="i"
          class="box-border wf f-c justify-between b-b-(1 #F7F7F7 solid) py3.5 first:pt0 last:(pb0 b-0!)"
          @click="item.isSelect = !item.isSelect"
        >
          <div class="text-(3.75 #111827) fw500">
            {{ item.content }}
          </div>
          <div
            class="size-3.5 f-c-c b-(1 #677180 rd-full solid) transition-all"
            :class="[item.isSelect && 'b-#1E88E5!']"
          >
            <div
              class="size-0 b-rd-full bg-#1E88E5 transition-all"
              :class="[item.isSelect && 'size-70%!']"
            />
          </div>
        </div>
      </div>

      <div class="card">
        <div class="mb2 text-(3.75 #111827) fw500">
          问题/意见描述
        </div>
        <!-- <div class="text-(3.25 #677180) fw500 mb6">
          请填写10个字以上的问题描述，以便我们更好的帮助您解决问题
        </div> -->
        <wd-textarea
          v-model="suggest"
          custom-class="p0!"
          :maxlength="500"
          show-word-limit
          placeholder=" 请填写10个字以上的问题描述，以便我们更好的帮助您解决问题"
        />
        <div class="grid grid-cols-3 wf gap-y-5">
          <div
            v-for="(url, index) in imageList"
            :key="index"
            class="relative size-22.4 overflow-hidden b-rd-3"
          >
            <div
              class="absolute right-0 top-0 z10 size-5 f-c-c bg-red/50"
              @click.stop="imageList.splice(index, 1)"
            >
              <i class="i-carbon:close-large text-(4 #fff) fw900" />
            </div>
            <WImage custom-class="size-full!" :src="url" />
          </div>
          <div v-if="imageList.length < 4" class="size-22.4" @click="uploadImg">
            <WImage custom-class="size-full!" :src="`${IMAGE_BASE_URL}/bg/13.png`" />
          </div>
        </div>
        <div class="mt3.75 text-(3.25 #677180) fw500">
          上传问题截图，最多4张(选填)
        </div>
      </div>

      <div class="card">
        <div class="mb2 text-(3.75 #111827) fw500">
          联系方式
        </div>
        <div class="text-(3.25 #677180)" />
        <wd-input
          v-model="phone"
          no-border
          type="tel"
          :maxlength="11"
          placeholder="填写您的手机号或邮箱，以便我们与您联系"
        />
      </div>
    </div>

    <div :style="bottomStyle" class="box-border f-c-c px3.75">
      <wd-button custom-class="h10.5! wf! bg-#1E88E5!" @click="submit">
        确定提交
      </wd-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  @apply wf bg-#fff b-rd-2 box-border mt3 p3;
}
</style>
