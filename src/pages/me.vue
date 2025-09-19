<script lang="ts" setup>
const { SYSTEM } = storeToRefs(useSystemStore())

const part = ref(SYSTEM.value.windowHeight / 10) // 可用屏幕宽度的1/10

const videoList = ref([
  {
    id: 1,
    url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
    isPlay: false,
  },
  {
    id: 2,
    url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_150752.mp4',
    isPlay: false,
  },
  {
    id: 3,
    url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_155516.mp4',
    isPlay: false,
  },
  {
    id: 4,
    url: 'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_155516.mp4',
    isPlay: false,
  },
])

function playVideo(item: any) {
  uni.createVideoContext(`video${item.id}`).play()
  item.isPlay = true
}

function stopVideo(item: any) {
  item.isPlay = false
  uni.createVideoContext(`video${item.id}`).pause()
}
</script>

<template>
  <div class="min-h100vh wf bg-[linear-gradient(to_bottom,#1E88E5,#F2F3F7_610rpx)]">
    <NavBar />
    <div class="mb5 mt9.25 wf f-c flex-col" @click="gotoPage('/pages-sub/me/me-info')">
      <WImage custom-class="size-19.25! b-rd-full! overflow-hidden!" src="https://picsum.photos/200/300" />
      <div class="mb1.5 mt2.5 text-(4.75 #111827) fw500">
        温润小队长
      </div>
      <div class="text-(3 #000000) fw500">
        ID: 12546236
      </div>
    </div>

    <div class="box-border wf px3.75">
      <div class="card">
        <div class="title">
          <div>我的视频</div>
          <div class="more">
            <div>查看全部</div>
            <i class="i-line-md:chevron-small-right" />
          </div>
        </div>

        <div v-if="!videoList.length" class="box-border wf f-c-c py6 text-(3 #1E88E5)">
          <span class="text-#A0AEC0">当前还没有视频，快去 </span>
          <span>获取吧</span>
          <i class="i-line-md:chevron-small-right" />
        </div>
        <div>
          <scroll-view scroll-x enable-flex>
            <div class="flex">
              <template
                v-for="item in videoList"
                :key="item.id"
              >
                <Follow
                  is-leave-document
                  :mask-opacity="0.7"
                  :z-index="10"
                  @tap-mask="stopVideo(item)"
                >
                  <FollowDiv
                    v-model:is-follow="item.isPlay"
                    :distance="{ top: part * 3, left: 0 }"
                  >
                    <div
                      :style="{
                        width: item.isPlay ? '100vw' : '240rpx',
                        height: item.isPlay ? '40vh' : '160rpx',
                      }"
                      class="mr1.5 h19.75 w29.75 overflow-hidden b-rd-1.25 bg-#f56c6c transition-all origin-r!"
                      @click="playVideo(item)"
                    >
                      <video
                        :id="`video${item.id}`"
                        class="relative z2 size-full"
                        object-fit="fill"
                        :controls="item.isPlay"
                        :show-fullscreen-btn="item.isPlay"
                        :show-play-btn="item.isPlay"
                        :show-center-play-btn="item.isPlay"
                        :enable-progress-gesture="item.isPlay"
                        :enable-play-gesture="item.isPlay"
                        :src="item.url"
                      >

                        <image
                          v-if="!item.isPlay"
                          :src="`${IMAGE_BASE_URL}/icon/33.png`"
                          class="absolute inset-0 z5 m-auto size-6.5"
                        />
                      </video>
                    </div>
                  </FollowDiv>
                </Follow>
              </template>
            </div>
          </scroll-view>
        </div>
      </div>

      <div class="card">
        <div class="title">
          <div>我的钱包</div>
          <div class="more">
            <i class="i-line-md:chevron-small-right" />
          </div>
        </div>

        <div class="text-(6.5 #111827) fw500">
          999.999
        </div>
      </div>

      <div class="card">
        <div class="title">
          <div>常用功能</div>
          <div class="more" />
        </div>
        <div class="grid grid-cols-4 wf gap-y-5.75">
          <div class="wf f-c flex-col text-(3 #111827)">
            <image
              :src="`${IMAGE_BASE_URL}/icon/10.png`"
              class="mb1.5 size-6"
            />
            <div>优惠券</div>
          </div>

          <div class="wf f-c flex-col text-(3 #111827)" @click="gotoPage('/pages-sub/me/footprints')">
            <image
              :src="`${IMAGE_BASE_URL}/icon/24.png`"
              class="mb1.5 size-6"
            />
            <div>我的足迹</div>
          </div>

          <div class="wf f-c flex-col text-(3 #111827)">
            <image
              :src="`${IMAGE_BASE_URL}/icon/5.png`"
              class="mb1.5 size-6"
            />
            <div>分享好友</div>
          </div>

          <div class="wf f-c flex-col text-(3 #111827)">
            <image
              :src="`${IMAGE_BASE_URL}/icon/6.png`"
              class="mb1.5 size-6"
            />
            <div>分享朋友圈</div>
          </div>

          <div class="wf f-c flex-col text-(3 #111827)">
            <image
              :src="`${IMAGE_BASE_URL}/icon/12.png`"
              class="mb1.5 size-6"
            />
            <div>申请城市代理</div>
          </div>

          <div class="wf f-c flex-col text-(3 #111827)">
            <image
              :src="`${IMAGE_BASE_URL}/icon/13.png`"
              class="mb1.5 size-6"
            />
            <div>景区入驻</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="title">
          <div>更多服务</div>
          <div class="more" />
        </div>

        <div class="grid grid-cols-4 wf gap-y-5.75">
          <div class="wf f-c flex-col text-(3 #111827)">
            <image
              :src="`${IMAGE_BASE_URL}/icon/15.png`"
              class="mb1.5 size-6"
            />
            <div>意见反馈</div>
          </div>

          <div class="wf f-c flex-col text-(3 #111827)">
            <image
              :src="`${IMAGE_BASE_URL}/icon/4.png`"
              class="mb1.5 size-6"
            />
            <div>设置中心</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  @apply wf b-rd-2.25 bg-#fff box-border px3 py3.75 mb2.5;
  .title {
    @apply text-(3.75 #111827) fw500 f-c justify-between mb1;
    .more {
      @apply f-c text-(3 #A0AEC0) fw500;
    }
  }
}
</style>
