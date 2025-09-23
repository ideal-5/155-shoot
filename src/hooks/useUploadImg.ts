export function useUploadImg() {
  function selectImage(count: number) {
    return new Promise<Parameters<Parameters<typeof uni.chooseMedia>[0]['success']>[0]>((resolve, reject) => {
      if (count <= 0) {
        reject(new Error('请选择图片'))
      }
      console.log('count', count)
      uni.chooseMedia({
        count,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        success: resolve,
        fail: reject,
      })
    })
  }

  function uploadImg(url: string) {
    return new Promise<{ url: string, size: number }>((resolve, reject) => {
      uni.uploadFile({
        url: import.meta.env.VITE_UPLOAD_BASEURL,
        filePath: url,
        name: 'image',
        success: (uploadFileRes) => {
          const data = JSON.parse(uploadFileRes.data) as { data: { url: string, size: number } }
          resolve(data.data)
        },
        fail: reject,
      })
    })
  }

  function uploadImgs(imgs: string[]) {
    return Promise.all(imgs.map(img => uploadImg(img)))
  }

  return {
    selectImage,
    uploadImgs,
  }
}
