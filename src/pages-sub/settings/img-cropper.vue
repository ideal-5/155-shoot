<script setup lang="ts">
const show = ref(false)

const imgUrl = ref('')

let eventChannel: any = null
onMounted(() => {
  const instance = getCurrentInstance().proxy
  eventChannel = (instance as any).getOpenerEventChannel()

  eventChannel.on('receiveParams', ({ imageUrl }) => {
    imgUrl.value = imageUrl
    show.value = true
  })
})

function onCancel() {
  uni.navigateBack()
}

function onConfirm(res: any) {
  uni.navigateBack()
  eventChannel.emit('onConfirm', res)
}

function onImgloaderror() {
  eventChannel.emit('onErr', '裁剪图片失败')
}
</script>

<template>
  <wd-img-cropper
    v-model="show"
    :img-src="imgUrl"
    @cancel="onCancel"
    @confirm="onConfirm"
    @imgloaderror="onImgloaderror"
  />
</template>

<style scoped lang="scss"></style>
