export type ScenicList = {
  content: string
  id: string
  img: string
  tag: string
  title: string
  type: string
}[]

export interface ScenicListParams extends Paging {
  cityCode: string
  title: string
  type: string
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
