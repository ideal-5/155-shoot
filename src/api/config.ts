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

// 意见反馈
export function postConfigFeedbackApi(params: Config.ConfigFeedbackParams) {
  return http.post('/user/advice', params)
}

// 协议
export function getConfigAgreementApi(params: Config.AgreementParams) {
  return http.post<Config.AgreementResult>('/index/agreement', params)
}

// 注销
export function postConfigLogoutApi() {
  return http.post('/user/cancelUser')
}
