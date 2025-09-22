import { http } from '@/http/http'

// 获取openid
export function getLoginOpenIdApi(code: string) {
  return http.post<string>('/index/getOpenid', { code })
}

// 登陆
export function loginApi(openid: string) {
  return http.post<any>('/index/login', { openid })
}
