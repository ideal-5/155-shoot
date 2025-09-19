<script setup lang='ts'>
const userStore = useUserStore()

const val = ref('')

const toast = useToast()
</script>

<template>
  <div class="box-border h100vh w100vw bg-#F7F7F7">
    <NavBar bar-color="#fff">
      提现
    </NavBar>

    <div class="my2.5 box-border wf bg-#fff p3">
      <div class="wf f-c justify-between">
        <div class="text-(3.5 #111827) fw500">
          提现账户
        </div>
        <div class="f-c">
          <image
            :src="`${IMAGE_BASE_URL}/icon/23.png`"
            class="mr2.25 size-5"
          />
          <div class="text-(3.5 #111827)">
            微信
          </div>
        </div>
      </div>
    </div>

    <div class="mt5.5 box-border wf b-rd-2 bg-#fff p3">
      <div class="text-(3.75 #111827) fw500">
        提现金额
      </div>
      <div class="my2.75 wf flex items-end">
        <div class="mr3.75 flex-shrink-0 text-(6.25 #111827) fw500">
          ￥
        </div>
        <wd-input v-model="val" input-mode="numeric" custom-class="flex-1" type="number" placeholder="可提现￥1000.00" />
      </div>
      <div class="wf f-c justify-between">
        <div class="text-(3 #677180) fw500">
          提现金额≥¥50才能提现
        </div>
        <div class="text-(3.75 #45ADF5) fw500">
          全部提现
        </div>
      </div>
    </div>

    <div class="mt2.5 box-border wf f-c justify-between bg-#fff px3.75 py5 text-(3.5 #111827) fw500" @click="gotoPage('/pages-sub/amount/withdrawal-details')">
      <div>提现记录</div>
      <i class="i-line-md:chevron-small-right" />
    </div>

    <div class="mt10 box-border wf f-c-c px5.5">
      <wd-button custom-class="bg-#1E88E5! wf! h11.5!" @click="gotoPage('/pages-sub/amount/hint')">
        提现
      </wd-button>
    </div>

    <div class="mt3.75 wf f-c-c text-(3 #A0AEC0)">
      温馨提示：每日1次提现机会，申请发起后，预计24小时到账
    </div>
  </div>
</template>
