export function useStyle() {
  const { navbarHeight, statusBarHeight, safeAreaInsetsRpx } = storeToRefs(useSystemStore())

  // 粘性定位
  const sticky = (top?: 'navBar' | 'timeBar') => {
    const topValue = {
      navBar: `${navbarHeight.value}px`,
      timeBar: `${statusBarHeight.value}px`,
    }
    return {
      'position': 'sticky',
      'top': top ? topValue[top] : '0px',
      'z-index': 10,
    }
  }

  // 定位到底部的区域
  const absoluteBottom = (height: number | string = 100) => {
    height = Number(height) + safeAreaInsetsRpx.value.bottom
    return {
      bottomHeightNum: height,
      bottomHeight: `${height}rpx`, // 总高
      bottomStyle: {
        width: '100%',
        height: `${height}rpx`,
        position: 'fixed',
        bottom: '0',
        right: '0',
        boxSizing: 'border-box',
        paddingBottom: `${safeAreaInsetsRpx.value.bottom}rpx`,
        zIndex: 5,
      },
    }
  }

  return { sticky, absoluteBottom }
}
