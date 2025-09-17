import type { InjectionKey } from 'vue'

// 定义 context 类型
export interface AContext {
  follow: (
    distance: { top?: number, right?: number, left?: number, bottom?: number },
    transitionCompleteCallback?: () => void
  ) => void
  cancelFollow: (
    transitionCompleteCallback?: () => void
  ) => void
}

// 定义 Symbol key（唯一标识）
export const aContextKey: InjectionKey<AContext> = Symbol('AContext')
