import { objToQuery } from './index'
/**
 * 图片资源的基准路径
 */
export const IMAGE_BASE_URL: string = import.meta.env.VITE_IMAGE_BASEURL || ''

type TestList = {
  id: number
  title: string
  text: string
  img: string
}[]
export function getTestListApi(pageNo: number, pageSize: number, time: number = 500) {
  return new Promise<TestList>((resolve) => {
    setTimeout(() => {
      resolve(Array.from({ length: pageSize }, (_, i) => ({
        id: (pageNo - 1) * pageSize + i,
        title: `标题 数据${(pageNo - 1) * pageSize + i}`,
        text: ` 描述 数据${(pageNo - 1) * pageSize + i}`,
        img: `https://dummyimage.com/${['400', '600', '800', '1000', '1200'][Math.floor(Math.random() * (4 - 0 + 1)) + 0]}x${['400', '600', '800', '1000', '1200'][Math.floor(Math.random() * (4 - 0 + 1)) + 0]}/004643/fff`,
      }) satisfies TestList[number]))
    }, time)
  })
}

// 页面跳转
export function gotoPage(url: Parameters<typeof uni.navigateTo>[0]['url'], query?: Record<string, string | number>) {
  const queryStr = objToQuery(query)
  uni.navigateTo({ url: `${url}${queryStr ? `?${queryStr}` : ''}` })
}
