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
