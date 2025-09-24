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

// 分销中心
export function amountDistributionCenterApi(params: Paging) {
  return http.post<{ all_amount: string, all_nums: string, rows: Amount.DistributionCenterList }>('/user/myTeamRecord', params)
}

// 我的团队列表
export function amountMyTeamListApi(params: Paging) {
  return http.post<{ all_amount: string, rows: Amount.MyTeamList }>('/user/myTeam', params)
}
