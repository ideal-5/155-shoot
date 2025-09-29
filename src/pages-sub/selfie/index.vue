<script setup lang='ts'>
const ahead = ref(true)

async function tapTake() {
  // uni.createCameraContext().takePhoto({
  //   success: (res) => {
  //     console.log('res', res.tempImagePath)
  //   },
  //   fail: (err) => {
  //     console.log('err', err)
  //   },
  // })
  gotoPage('/pages-sub/selfie/generated')
}
</script>

<template>
  <div class="min-h-100vh w100vw f-c flex-col bg-[linear-gradient(to_bottom,#1E88E5,#F2F3F7_610rpx)]">
    <NavBar />

    <image
      :src="`${IMAGE_BASE_URL}/bg/24.png`"
      mode="heightFix"
      class="mt9 h8"
    />

    <!-- <image
      :src="`${IMAGE_BASE_URL}/bg/23.png`"
      mode="heightFix"
      class="mb10 mt11 h69.25"
    /> -->

    <camera :device-position="ahead ? 'back' : 'front'" class="mb10 mt11 size-69.25 b-rd-full" />

    <div class="relative box-border wf f-c justify-around px2">
      <div class="f-c-c flex-col">
        <div class="mb3 text-(3.75 #111827) fw500">
          避免遮挡
        </div>
        <image
          :src="`${IMAGE_BASE_URL}/icon/30.png`"
          class="size-11.25"
        />
      </div>
      <image
        :src="`${IMAGE_BASE_URL}/bg/5.png`"
        mode="widthFix"
        class="w8.75"
      />
      <div class="f-c-c flex-col">
        <div class="mb3 text-(3.75 #111827) fw500">
          光线充足
        </div>
        <image
          :src="`${IMAGE_BASE_URL}/icon/25.png`"
          class="size-11.25"
        />
      </div>
      <image
        :src="`${IMAGE_BASE_URL}/bg/5.png`"
        mode="widthFix"
        class="w8.75"
      />
      <div class="f-c-c flex-col">
        <div class="mb3 text-(3.75 #111827) fw500">
          正对手机
        </div>
        <image
          :src="`${IMAGE_BASE_URL}/icon/21.png`"
          class="size-11.25"
        />
      </div>
    </div>

    <div class="relative mt14 wf f-c-c">
      <image
        :src="`${IMAGE_BASE_URL}/icon/39.png`"
        class="size-21.25"
        @click="tapTake"
      />
      <image
        :src="`${IMAGE_BASE_URL}/icon/28.png`"
        class="absolute right-7.5 top-50% size-9.5"
        style="transform: translateY(-50%);"
        @click="ahead = !ahead"
      />
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
