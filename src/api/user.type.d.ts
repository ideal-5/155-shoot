export interface UserCityAgentApplyParams {
  name: string
  tel: string
  cityCode: string
}

export interface CityAgentApplyDetail {
  create_time: string
  name: string
  tel: string
  cityName: string
  status: '-1'
}

export interface UserScenicApplyParams {
  name: string
  tel: string
  cityCode: string
  title: string
  img: string
}

export interface ScenicApplyDetail {
  create_time: string
  name: string
  tel: string
  cityName: string
  status: '-1'
  img: string
  title: string
}

export interface PutUserInfoParams {
  nickname: string
  img: string
  tel: string
}
