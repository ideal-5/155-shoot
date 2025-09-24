import type * as Amount from './amount.type'
import { http } from '@/http/http'

export type { Amount }

// 充值下单
export function amountCreateOrderApi(amount: number) {
  return http.post<{ orderId: string, orderNo: string }>('/user/topUp', { amount })
}

// 我的优惠券列表
export function amountMyCouponListApi(status: -1 | 1) {
  return http.post<Amount.CouponList>('/user/couponLists', { status })
}
