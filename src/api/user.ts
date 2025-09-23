import { http } from '@/http/http'

// 获取用户信息
export function getUserInfoApi() {
  return http.post<IUserInfo>('/user/userInfo')
}
