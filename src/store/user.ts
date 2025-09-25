import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfoApi } from '@/api'

// 初始化状态
const userInfoState: IUserInfo = {
  nickname: '',
  img: '/static/images/default-avatar.png',
  amount: '0.00',
  tel: '',
  agent_apply: -1,
  business_apply: -1,
}

const identityInfoState: IdentityInfo = {
  userToken: '',
  userId: '',
}

export const useUserStore = defineStore(
  'user',
  () => {
    // 定义用户信息
    const userInfo = ref<IUserInfo>({ ...userInfoState })

    // 定义接口所需的信息 token userid
    const identityInfo = ref<IdentityInfo>({ ...identityInfoState })

    const hasLogin = computed(() => !!identityInfo.value.userToken)

    // 设置用户身份信息
    const setIdentityInfo = (val: IdentityInfo) => {
      identityInfo.value = val
    }
    // 设置用户信息
    const setUserInfo = (val: IUserInfo) => {
      console.log('设置用户信息', val)
      // 若头像为空 则使用默认头像
      if (!val.img) {
        val.img = userInfoState.img
      }
      userInfo.value = val
    }

    // 删除用户信息
    const clearUserInfo = () => {
      userInfo.value = { ...userInfoState }
      uni.removeStorageSync('user')
      identityInfo.value = { ...identityInfoState }
    }

    /**
     * 获取用户信息
     */
    const fetchUserInfo = async () => {
      const res = await getUserInfoApi()
      setUserInfo(res.data)
      return res
    }

    return {
      userInfo,
      identityInfo,
      hasLogin,
      setIdentityInfo,
      clearUserInfo,
      fetchUserInfo,
      setUserInfo,
    }
  },
  {
    persist: true,
  },
)
