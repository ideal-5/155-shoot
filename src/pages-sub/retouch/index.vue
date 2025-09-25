<script setup lang='ts'>
const toast = useToast()

const { selectImage, uploadImgs } = useUploadImg()

const img = ref(['', ''])

function beautifulPicture(url: string, filterId: string) {
  const permission = {
    api_key: '460ca85f92f8402c9d534d0e75983c5e',
    api_secret: 'c5416f962f6e496b8c607ff3d213ccb4',
  }

  return new Promise<string>((resolve, reject) => {
    uni.request({
      url: `https://openapi.mtlab.meitu.com/v1/filter?api_key=${permission.api_key}&api_secret=${permission.api_secret}`,
      method: 'POST',
      data: {
        media_info_list: [
          {
            media_data: url,
            media_profiles: {
              media_data_type: 'url',
            // ref_name: 'origin',
            },
          },
        ],
        parameter: {
          rsp_media_type: 'url',
          filterType: filterId,
        // func_name: 'ai_color_transfer',
        // ai_color_transfer_type: 'material',
        // material_id: 'Fa0436P7QKK0zKRL',
        // image_reference: 'origin',
        },
      },
      header: {
        'Content-Type': 'application/json', // 自定义请求头信息
      },
      success: (res: any) => {
        // console.log('res-->request-->>', res)
        resolve(res.data.media_info_list[0].media_data as string)
      },
      fail: reject,
    })
  })
}
const filterList = ref([
  { name: '彩铅', id: 'Fa0145JwLfwjjbch' },
  { name: 'Hana', id: 'Fa0415o4g8OfwAw8' },
  { name: '中央公园', id: 'Fa0436P7QKK0zKRL' },
  { name: '优格', id: 'Fa0108HAz4MlDLVx' },
  { name: '兰桂坊', id: 'Fa0535samdIjz0Wq' },
  { name: '粉镜', id: 'Fa0727hdRPZAndOR' },
])
const showAction = ref(false)

const showOverlay = ref(false)
async function start({ item: { id } }: { item: { id: string } }) {
  try {
    const imgs = await selectImage(1)
    const res = await uploadImgs(imgs.tempFiles.map(item => item.tempFilePath))
    img.value[0] = res[0].url
    showOverlay.value = true
    img.value[1] = await beautifulPicture(res[0].url, id)

    uni.navigateTo({
      url: '/pages-sub/retouch/result',
      success(res) {
        res.eventChannel.emit('sendData', img.value)
        showOverlay.value = false
      },
    })
  }
  catch (error) {
    showOverlay.value = false
    toast.error('美图失败，请稍后再试')
  }
}
</script>

<template>
  <wd-action-sheet
    v-model="showAction"
    title="选择滤镜"
    :actions="filterList"
    cancel-text="取消"
    @select="start"
  />
  <wd-overlay :show="showOverlay">
    <div class="size-full f-c-c">
      <div class="glass-12 box-border w50vw f-c-c flex-col b-rd-2 py10">
        <i class="i-svg-spinners:90-ring-with-bg mb3 text-5 fw900" />
        <div class="text-3.5">
          生成图片中，请稍后...
        </div>
      </div>
    </div>
  </wd-overlay>

  <div class="min-h100vh w100vw">
    <NavBar>旅图美化</NavBar>

    <image
      :src="`${IMAGE_BASE_URL}/bg/31.png`"
      mode="widthFix"
      class="fixed left-0 right-0 top-0 z1 wf"
    />

    <div class="relative z2 box-border wf px3.75">
      <div class="mb9 mt4.75 wf f-c-c">
        <image
          :src="`${IMAGE_BASE_URL}/bg/20.png`"
          mode="widthFix"
          class="w44.75"
        />
      </div>

      <div class="box-border wf b-rd-2.5 bg-#DBE0E5 p5">
        <WImage
          src="https://picsum.photos/200/150"
          custom-class="b-(#FAFAFC! 1! solid!) wf! b-rd-tl-6! b-rd-br-6! overflow-hidden"
          mode="widthFix"
        />
      </div>

      <!-- <image
        :src="img[0]"
        mode="widthFix"
        class="wf"
      />
      <image
        :src="img[1]"
        mode="widthFix"
        class="wf"
      /> -->

      <!--  -->
      <div class="shadow-box mt11.5 box-border wf f-c flex-col b-rd-2.5 bg-#fff p5">
        <wd-button custom-class="bg-[linear-gradient(156deg,#AFA3F8_0%,#777BF6_100%)]! b-rd-3.5! wf! h16.25!" @click="showAction = true">
          <div class="f-c text-(4.75 #FFFFFF) fw500">
            <image
              :src="`${IMAGE_BASE_URL}/icon/47.png`"
              class="mr3 size-5.75"
            />
            <span>开始美化</span>
          </div>
        </wd-button>
        <div class="mt3.75 text-(3.75 #375564)">
          智能美肤· 欢颜出彩
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.shadow-box {
  box-shadow: 0px 4px 6px 0px rgba(147, 147, 147, 0.3);
}
</style>
