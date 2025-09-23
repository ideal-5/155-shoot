import type * as Scenic from './scenic.type'
import { http } from '@/http/http'

export type { Scenic }

// 首页推荐景区
export function getHomeRecommendScenicApi(params: { cityCode: string }) {
  return http.post<Scenic.ScenicList>('/index/index', params)
}
