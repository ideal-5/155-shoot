import type * as Config from './config.type'
import { http } from '@/http/http'

export type { Config }

// 获取轮播图
export function getConfigBannerApi() {
  return http.post<Config.BannerResult>('/index/banner')
}

// 配置详情
export function getConfigDetailApi() {
  return http.post<Config.DetailResult>('/index/setConf')
}
