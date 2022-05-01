export interface EthereumProvider {
  on?: (...args: any[]) => void
  removeListener?: (...args: any[]) => void
  autoRefreshOnNetworkChange?: boolean
  isMetaMask: boolean
  isCoinbaseWallet: boolean
}

declare global {
  interface Window {
    ethereum?: EthereumProvider
  }
}
