<script setup lang='ts'>
const activeAddress = ref<[string, string]>(['', ''])

const from = ref({
  phone: '19121140161',
})

const review = ref(true)
</script>

<template>
  <div class="min-h-100vh w100vw bg-#F7F7F7">
    <NavBar is-empty-fill class-name="text-#fff">
      城市代理
    </NavBar>

    <image
      :src="`${IMAGE_BASE_URL}/bg/3.png`"
      class="relative z1 wf"
      mode="widthFix"
    />

    <div class="box-border wf px3.75 -mt7.75">
      <template v-if="review">
        <div class="relative z2 wf b-rd-3 bg-#fff">
          <div class="box-border wf f-c-c py12.5">
            <image
              :src="`${IMAGE_BASE_URL}/bg/1.png`"
              mode="widthFix"
              class="w25"
            />
          </div>

          <div class="wf f-c-c text-(4.25 #17191F) fw500">
            您的申请已提交，请保持手机通畅
          </div>

          <div class="box-border wf px3.75">
            <div class="mt8.75 h0.25 bg-#F7F8FA" />

            <div class="box-border wf py2">
              申请时间：2023/01/15 15:36
            </div>
            <div class="box-border wf py2">
              联系人：名字
            </div>
            <div class="box-border wf py2">
              联系电话：15035694423
            </div>
            <div class="box-border wf py2">
              申请身份：城市代理
            </div>
            <div class="box-border wf py2">
              当前城市：北京市
            </div>
          </div>
        </div>

        <div class="mt7.5 box-border wf">
          <wd-button custom-class="bg-#1E88E5! h11.75! wf!">
            我知道了
          </wd-button>
        </div>
      </template>

      <template v-if="!review">
        <div class="relative z2 box-border wf b-rd-3 bg-#fff">
          <Follow>
            <div class="box-border wf b-rd-2 bg-#fff px5.75 py3">
              <div class="mb3 text-(3.75 #111827) fw500">
                请填写您的姓名
              </div>
              <FollowInput
                placeholder="请填写您的姓名"
                no-border
                custom-class="b-(solid! 1! #D9D9D9!) h10! b-rd-1! box-border! px4.75! f-c!"
              />
            </div>
          </Follow>
          <Follow>
            <div class="box-border wf b-rd-2 bg-#fff px5.75 py3">
              <div class="mb3 text-(3.75 #111827) fw500">
                请填写您的联系电话
              </div>
              <FollowInput
                v-model="from.phone"
                no-border
                placeholder="请填写您的联系电话"
                custom-class="b-(solid! 1! #D9D9D9!) h10! b-rd-1! box-border! px4.75! f-c!"
              />
            </div>
          </Follow>
          <div class="box-border wf b-rd-2 bg-#fff px5.75 py3">
            <div class="mb3 text-(3.75 #111827) fw500">
              请选择你当前所在的城市
            </div>

            <picker
              mode="region"
              level="city"
              :value="activeAddress"
              class="grid grid-cols-1 wf"
              @change="(e:{detail:{value:string[]}}) => {
                activeAddress[0] = e.detail.value[0]
                activeAddress[1] = e.detail.value[1]
              }"
            >
              <div class="box-border wf f-c justify-between px4.75 h10! b-(1! #D9D9D9! rd-1! solid!)">
                <div class="text-3">
                  {{ activeAddress[1] }}
                </div>
                <i class="i-line-md:chevron-small-down text-(6 #A0AEC0)" />
              </div>
            </picker>
          </div>

          <div class="box-border wf b-rd-2 bg-#fff px5.75 py3">
            <wd-button custom-class="wf! h11.25! bg-#1E88E5">
              申请成为推广员
            </wd-button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
