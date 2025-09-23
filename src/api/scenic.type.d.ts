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
