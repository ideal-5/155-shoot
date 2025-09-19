<script setup lang="ts"></script>

<template>
  <div class="h100vh w100vw bg-#F7F7F7">
    <NavBar bar-color="#fff">
      设置中心
    </NavBar>
    <div class="mt2 box-border wf bg-#fff px3.75">
      <div
        class="box-border wf f-c justify-between b-b-(1 #F7F7F7 solid) py3 text-(3.75 #111827) fw500"
        @click="gotoPage('/pages-sub/settings/html-page')"
      >
        <div>用户协议</div>
        <i class="i-line-md:chevron-small-right" />
      </div>
      <div
        class="box-border wf f-c justify-between b-b-(1 #F7F7F7 solid) py3 text-(3.75 #111827) fw500"
        @click="gotoPage('/pages-sub/settings/html-page')"
      >
        <div>隐私政策</div>
        <i class="i-line-md:chevron-small-right" />
      </div>

      <div
        class="box-border wf f-c justify-between py3 text-(3.75 #111827) fw500"
      >
        <div>注销账号</div>
        <i class="i-line-md:chevron-small-right" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
