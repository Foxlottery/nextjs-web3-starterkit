export const NetworkContextName = 'NETWORK'

export const IS_IN_IFRAME = typeof window !== 'undefined' && window.parent !== window

// 30 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 30

export const DEFAULT_TXN_DISMISS_MS = 25000
