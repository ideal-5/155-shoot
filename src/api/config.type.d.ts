export type BannerResult = {
  id: string
  type: string
  img: string
}[]

export interface DetailResult {
  id: string
  w_fee: string
  c_fee: string
  w_amount: string
  w_max_amount: string
  create_time: string
}

export interface ConfigFeedbackParams {
  content: string
  tel: string
  img: string
  type: number | string
}
