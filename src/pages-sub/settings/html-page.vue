<script setup lang='ts'>
const title = ref('')
const content = ref('')

onMounted(() => {
  const instance = getCurrentInstance().proxy
  const eventChannel = (instance as any).getOpenerEventChannel()
  eventChannel.on('sendData', (data: { title: string, content: string }) => {
    title.value = data.title
    content.value = data.content
  })
})
</script>

<template>
  <div class="box-border w100vw px3.75">
    <NavBar bar-color="#fff">
      {{ title }}
    </NavBar>
    <mp-html :content="content" />
  </div>
</template>

<style scoped lang='scss'>

</style>
