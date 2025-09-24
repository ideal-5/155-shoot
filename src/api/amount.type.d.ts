export type CouponList = {
  cid: string
  rank: string
  record_id: string
  end_time: string
  title: string
  goods_type_str: string
  amount: string
}[]

export type MyTeamList = {
  cash_fee: number
  create_time: string
  id: string
  img: string
  nickname: string
}[]

export type DistributionCenterList = {
  id: string
  img: string
  nickname: string
  create_time: string
  type_str: string
  amount: string
}[]

export interface AssetsDetailListParams extends Paging {
  /** 1收入 2支出 */
  type: 1 | 2
}

export type AssetsDetailList = {
  type_str: string
  create_time: string
  id: string
  amount: string
  type: AssetsDetailListParams['type']
}[]
