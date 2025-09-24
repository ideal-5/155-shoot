import { http } from '@/http/http'

// 充值下单
export function amountCreateOrderApi(amount: number) {
  return http.post<{ orderId: string, orderNo: string }>('/user/topUp', { amount })
}
