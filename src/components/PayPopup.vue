<script setup lang='ts'>
const showPay = ref(true)

const payType = ref<'wx' | 'balance'>('wx')

const showCoupon = ref(false)

type CouponList = Awaited<ReturnType<typeof getTestListApi>>

const couponList = ref<CouponList>([])
const activeCoupon = ref<number>()
async function getCouponList() {
  const data = await getTestListApi(1, 10)
  couponList.value = data
}
</script>

<template>
  <wd-popup v-model="showPay" position="bottom" closable custom-class="bg-transparent!">
    <div class="box-border wf b-rd-t-2 bg-#fff px4 pb-safe">
      <div class="box-border wf f-c-c pb5.75 pt6.5">
        <div class="text-(8.75 #111827) fw700">
          <span class="text-6.5">￥</span>
          <span>6.00</span>
        </div>
      </div>

      <div class="wf f-c justify-between b-b-(1 #F2F3F7 solid)">
        <div class="text-(3.25 #A0AEC0)">
          订单编号
        </div>
        <div class="box-border pb3.5 text-(3.25 #1E88E5) underline decoration-#1E88E5 underline-offset-2 decoration-dashed">
          HJW1542755
        </div>
      </div>

      <div class="box-border wf f-c justify-between pb3 pt4.5" @click="showCoupon = true">
        <div class="text-(3.25 #111827)">
          优惠券
        </div>
        <div class="text-(3 #A0AEC0)">
          <span>暂无</span>
          <template>
            <span class="text-(#FF594D)">1 </span>
            <span>张可用</span>
          </template>
          <span class="text-(#FF594D)">-10￥</span>
          <i class="i-line-md:chevron-small-right" />
        </div>
      </div>

      <div class="mb2 text-(3.75 #111827) fw500">
        支付方式
      </div>

      <div class="box-border wf f-c justify-between py1.75" @click="payType = 'wx'">
        <div class="f-c">
          <image
            :src="`${IMAGE_BASE_URL}/icon/32.png`"
            class="mr2.5 size-5.5"
          />
          <div class="text-(3.25 #111827) fw500">
            微信支付
          </div>
        </div>

        <div
          class="box-border size-5 f-c-c b-(1 #1E88E5 rd-full solid)"
          :class="[payType === 'wx' && 'b-#1E88E5 bg-#1E88E5']"
        >
          <i v-if="payType === 'wx'" class="i-carbon:checkmark text-3 text-#fff" />
        </div>
      </div>
      <div class="box-border wf f-c justify-between py1.75" @click="payType = 'balance'">
        <div class="f-c">
          <image
            :src="`${IMAGE_BASE_URL}/icon/44.png`"
            class="mr2.5 size-5.5"
          />
          <div class="text-(3.25 #111827) fw500">
            钱包支付
          </div>
        </div>

        <div
          class="box-border size-5 f-c-c b-(1 #A0AEC0 rd-full solid)"
          :class="[payType === 'balance' && 'b-#1E88E5 bg-#1E88E5']"
        >
          <i v-if="payType === 'balance'" class="i-carbon:checkmark text-3 text-#fff" />
        </div>
      </div>

      <wd-button custom-class="h11! bg-#1E88E5! text-(3.75!) fw500! wf! mt9.5! mb3!">
        立即支付
      </wd-button>
    </div>
  </wd-popup>

  <wd-popup v-model="showCoupon" position="bottom" closable custom-class="bg-transparent!" @before-enter="getCouponList">
    <div class="box-border h70vh wf flex flex-col b-rd-t-2 bg-#fff px3.75 pb-safe">
      <div class="box-border wf f-c-c flex-shrink-0 pb5.75 pt6.5 text-(3.75 #111827) fw500">
        优惠券
      </div>

      <scroll-view scroll-y class="size-full" :show-scrollbar="false">
        <div v-for="item in couponList" :key="item.id" class="coupon-item mb2.5 box-border wf flex b-rd-2 px3 py2.5">
          <div class="mr3.25 h19 w24 f-c-c flex-col b-rd-1.25 bg-[linear-gradient(133deg,#3081F6_0%,#5CB7FB_100%)] text-#fff fw500">
            <div>
              <span class="text-3.5">￥</span>
              <span class="text-7.25">10</span>
            </div>
            <div class="text-2.75">
              无门槛
            </div>
          </div>

          <div class="min-w-0 flex flex-1">
            <div class="hf min-w-0 flex flex-1 flex-col justify-between text-(2.5 #A0AEC0)">
              <div class="text-(3.5 #3D3D3D) fw500">
                {{ item.title }}
              </div>
              <div>仅用于视频优惠</div>
              <div>2028.06.24-2029.06.24</div>
            </div>

            <div class="ml2 hf w15 f-c-c flex-shrink-0">
              <wd-button plain :type="activeCoupon === item.id ? 'info' : 'primary' " custom-class="text-2.5! fw500! wf! min-w-0! h5.5!" @click="activeCoupon = activeCoupon === item.id ? null : item.id">
                {{ activeCoupon === item.id ? '使用中' : '立即使用' }}
              </wd-button>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
  </wd-popup>
</template>

<style scoped lang='scss'>
.coupon-item {
  box-shadow:
    rgba(0, 0, 0, 0.12) 0px 1px 3px,
    rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
</style>
