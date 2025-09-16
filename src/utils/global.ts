/**
 * 图片资源的基准路径
 */
export const IMAGE_BASE_URL: string = import.meta.env.VITE_IMAGE_BASEURL || ''

export function getTestListApi(pageNo: number, pageSize: number, time: number = 500) {
  return new Promise<{ title: string, text: string, img: string }[]>((resolve) => {
    setTimeout(() => {
      resolve(Array.from({ length: pageSize }, (_, i) => ({
        title: `标题 数据${(pageNo - 1) * pageSize + i}`,
        text: ` 描述 数据${(pageNo - 1) * pageSize + i}`,
        img: `https://dummyimage.com/600x${['400', '600', '800', '1000', '1200'][Math.floor(Math.random() * (4 - 0 + 1)) + 0]}/000/fff`,
      })))
    }, time)
  })
}
