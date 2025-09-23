export type ScenicList = {
  content: string
  id: string
  img: string
  tag: string
  title: string
  type: string
}[]

export type ScenicListSelectResult = {
  title: string
  id: string
}[]

export interface ScenicListParams extends Paging {
  cityCode: string
  title?: string
  /**
   * 1推荐 2热门
   */
  type: '1' | '2'
}

export interface ScenicDetail {
  title: string
  tag: string
  content: string
  type: string
  banner: string
  lag: string
  lon: string
  signArea: {
    id: string
    content: string
    img: string
    title: string
  }[]
}
