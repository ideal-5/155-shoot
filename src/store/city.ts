import { defineStore } from 'pinia'
import QQMapWX from '@/common/qqmap-wx-jssdk.js'

/** 逆地址解析返回结果 */
interface ReverseGeocoderResult {
  message: string
  request_id: string
  status: number
  result: {
    address: string
    address_component: {
      nation: string
      province: string
      city: string
      district: string
      street: string
    }
    ad_info: {
      city_code: string
      location: {
        lat: number
        lng: number
      }
    }
  }
}

export const useCityStore = defineStore('city', () => {
  const qqMap = new QQMapWX({
    key: 'KINBZ-35F6L-YQIP4-MN3DQ-M64QJ-BXBIX',
  })

  const isAuthorize = ref<boolean>(false) // 是否授权位置信息

  // 地址详情
  const cityDetails = ref<ReverseGeocoderResult['result']>()

  const location = computed(() => ({
    latitude: cityDetails.value?.ad_info?.location?.lat || 0,
    longitude: cityDetails.value?.ad_info?.location?.lng || 0,
  }))

  const city = computed(() => {
    const { province = '', city = '', district = '' } = cityDetails.value?.address_component ?? {}
    return { province, city, district }
  })

  // 逆地址解析
  const getCityText = ({ latitude, longitude }: { latitude: number, longitude: number }) => {
    return new Promise<ReverseGeocoderResult>((resolve, reject) => {
      qqMap.reverseGeocoder({
        location: { latitude, longitude },
        success: resolve,
        fail: reject,
      })
    })
  }

  // 根据地名获取坐标
  const getLocation = (address: string) => {
    return new Promise<{ latitude: number, longitude: number }>((resolve, reject) => {
      qqMap.geocoder({
        address,
        success: (res: any) => {
          const { lat, lng } = res.result.location
          resolve({ latitude: lat, longitude: lng } as { latitude: number, longitude: number })
        },
        fail: reject,
      })
    })
  }

  // 通过地名修改当前位置
  const setCity = async (address: string) => {
    try {
      const locationRes = await getLocation(address)
      const res = await getCityText(locationRes)
      cityDetails.value = res.result
    }
    catch (error) {
      throw new Error('修改位置失败')
    }
  }

  // 初始化当前位置和坐标
  const initLocation = async () => {
    try {
      await uni.authorize({ scope: 'scope.userLocation' })
      isAuthorize.value = true
    }
    catch (error) {
      isAuthorize.value = false
      throw new Error('位置授权失败')
    }

    try {
      const { longitude, latitude } = await uni.getLocation({ type: 'wgs84' })
      const res = await getCityText({ latitude, longitude })
      cityDetails.value = res.result
    }
    catch (error) {
      console.log('error', error)
      throw new Error('获取位置信息失败')
    }
  }

  function getDistance(lat2: string | number, lon2: number | string) {
    const lat1 = Number(location.value.latitude)
    const lon1 = Number(location.value.longitude)
    lat2 = Number(lat2)
    lon2 = Number(lon2)

    const R = 6371e3 // 地球半径 (米)
    const φ1 = lat1 * Math.PI / 180
    const φ2 = lat2 * Math.PI / 180
    const Δφ = (lat2 - lat1) * Math.PI / 180
    const Δλ = (lon2 - lon1) * Math.PI / 180

    const a
      = Math.sin(Δφ / 2) * Math.sin(Δφ / 2)
        + Math.cos(φ1) * Math.cos(φ2)
        * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const distance = R * c // 米

    // 格式化输出
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(1)} km`
    }
    else {
      return `${Math.round(distance)} m`
    }
  }

  return {
    getCityText,
    getLocation,
    initLocation,
    setCity,
    getDistance,
    isAuthorize,
    cityDetails: computed(() => cityDetails.value),
    city,
    location,
    cityCode: computed(() => cityDetails.value?.ad_info?.city_code),
  }
})
