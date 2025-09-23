import { defineStore } from 'pinia'
import QQMapWX from '@/common/qqmap-wx-jssdk.js'

interface City {
  // nation: string
  province: string
  city: string
  district: string
  cityCode: string
  // street: string
}
interface Location {
  latitude: number
  longitude: number
}

export const useCityStore = defineStore('city', () => {
  const qqMap = new QQMapWX({
    key: 'KINBZ-35F6L-YQIP4-MN3DQ-M64QJ-BXBIX',
  })
  const toast = useToast()

  const isAuthorize = ref<boolean>(true) // 是否授权位置信息

  const city = ref<City>({
    province: '',
    city: '',
    district: '',
    cityCode: '',
    //  province: '北京市',
    // city: '北京市',
    // district: '东城区',
  })
  const cityRead = readonly(city)

  const location = ref<Location>({
    latitude: 0,
    longitude: 0,
    // latitude: 39.91667,
    // longitude: 116.3975,
  })
  const locationRead = readonly(location)

  // 逆地址解析
  const getCityText = ({ latitude, longitude }: Location) => {
    return new Promise<City>((resolve, reject) => {
      qqMap.reverseGeocoder({
        location: { latitude, longitude },
        success: (res: any) => {
          console.log('res', res)
          const { province, city, district } = res.result.address_component
          const { city_code } = res.result.ad_info
          resolve({ province, city, district, cityCode: city_code } satisfies City)
        },
        fail: reject,
      })
    })
  }

  // 地址解析
  const getLocation = (obj: City) => {
    return new Promise<Location>((resolve, reject) => {
      qqMap.geocoder({
        address: Object.values(obj).join(''),
        success: (res: any) => {
          const { lat, lng } = res.result.location
          resolve({ latitude: lat, longitude: lng } as Location)
        },
        fail: reject,
      })
    })
  }

  // 修改当前位置
  const setCity = async (obj: City) => {
    try {
      const res = await getLocation(obj)
      location.value = res
      city.value = obj
    }
    catch (error) {
      toast.error('获取位置坐标失败')
    }
  }

  // 初始化当前位置和坐标
  const initLocation = async () => {
    try {
      await uni.authorize({ scope: 'scope.userLocation' })
      isAuthorize.value = true
    }
    catch (error) {
      toast.error('位置授权失败')
      isAuthorize.value = false
      return
    }

    try {
      const { longitude, latitude } = await uni.getLocation({ type: 'wgs84' })
      const res = await getCityText({ latitude, longitude })
      city.value = res
      location.value = { longitude, latitude }
    }
    catch (error) {
      console.log('error', error)
      toast.error('获取位置信息失败')
    }
  }

  return {
    getCityText,
    getLocation,
    initLocation,
    setCity,
    isAuthorize,
    cityRead,
    locationRead,
    location,
  }
})
