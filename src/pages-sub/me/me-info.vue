<script setup lang='ts'>
const name = ref('')
</script>

<template>
  <div class="box-border min-h-100vh w100vw bg-#F6F7F9 px3.75">
    <NavBar bar-color="#fff">
      个人资料
    </NavBar>

    <button class="mt3.75! wf! f-c! flex-col!" open-type="chooseAvatar">
      <div class="relative size-18.75">
        <WImage custom-class="size-full! bg-red! b-rd-full! overflow-hidden!" />
        <image
          :src="`${IMAGE_BASE_URL}/icon/51.png`"
          class="absolute bottom-0 right-1 size-4.25"
        />
      </div>

      <div class="my5 text-(3 #A0AEC0)">
        点击更换头像
      </div>
    </button>

    <div class="box-border wf flex b-rd-2.5 bg-#fff px4 py5">
      <div class="mr2 w-fit flex-shrink-0">
        用户昵称
      </div>
      <div class="min-w-0 flex-1 bg-#1E88E5">
        <wd-input
          v-model="name"
          no-border
          placeholder="请输入用户名"
          custom-input-class="text-right!"
          type="nickname"
        />
      </div>
    </div>

    <div class="mt5 box-border wf flex b-rd-2.5 bg-#fff px4 py5">
      <div class="mr2 w-fit flex-shrink-0">
        手机号
      </div>
      <div class="min-w-0 flex-1 bg-#1E88E5">
        <wd-input
          v-model="name"
          no-border
          placeholder="请输入电话号"
          custom-input-class="text-right!"
          type="number"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
