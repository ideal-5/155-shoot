import type * as User from './user.type'
import { http } from '@/http/http'

export type { User }

// 获取用户信息
export function getUserInfoApi() {
  return http.post<IUserInfo>('/user/userInfo')
}

// 城市代理申请
export function userCityAgentApplyApi(params: User.UserCityAgentApplyParams) {
  return http.post<any>('/user/applyAgent', params)
}

// 城市代理申请详情
export function getUserCityAgentApplyDetailApi() {
  return http.post<User.CityAgentApplyDetail>('/user/applyAgentLists')
}

// 景区入驻申请
export function userScenicApplyApi(params: User.UserScenicApplyParams) {
  return http.post<any>('/user/applyBusiness', params)
}

// 景区入驻申请申请详情
export function getUserScenicApplyDetailApi() {
  return http.post<User.ScenicApplyDetail>('/user/applyBusinesslists')
}

// 修改用户信息
export function putUserInfoApi(params: User.PutUserInfoParams) {
  return http.post<any>('/user/editUserInfo', params)
}
