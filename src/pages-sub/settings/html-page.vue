<script setup lang='ts'>
const title = ref('Hello World')
const content = ref('<div>Hello World!</div>')
</script>

<template>
  <div class="w100vw">
    <NavBar>{{ title }}</NavBar>
    <mp-html :content="content" />
  </div>
</template>

<style scoped lang='scss'>

</style>
