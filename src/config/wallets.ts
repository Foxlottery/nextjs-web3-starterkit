import { ChainId } from '@foxlottery/core-sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'
import config from 'app/config'
import { NetworkConnector } from 'app/entities/connectors'
import Cookies from 'js-cookie'
import { InjectedConnector } from 'web3-react-injected-connector'

import RPC from './rpc'

const supportedChainIds = Object.values(ChainId) as number[]

let network: NetworkConnector | undefined

export const getNetworkConnector = (): NetworkConnector => {
  if (network) {
    return network
  }

  const defaultChainId = Cookies.get('chain-id')

  return (network = new NetworkConnector({
    defaultChainId: defaultChainId ? Number(defaultChainId) : 1,
    urls: RPC,
  }))
}

export const injected = new InjectedConnector({
  supportedChainIds,
})

export interface WalletInfo {
  connector?: (() => Promise<AbstractConnector>) | AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'injected.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  METAMASK_MOBILE: {
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Open in MetaMask app.',
    href: `https://metamask.app.link/dapp/${config.domain}`,
    color: '#E8831D',
    mobile: true,
    mobileOnly: true,
  },
  WALLET_CONNECT: {
    connector: async () => {
      const WalletConnectConnector = (await import('web3-react-walletconnect-connector')).WalletConnectConnector
      return new WalletConnectConnector({
        rpc: RPC,
        bridge: 'https://bridge.walletconnect.org',
        qrcode: true,
        supportedChainIds,
      })
    },
    name: 'WalletConnect',
    iconName: 'wallet-connect.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true,
  },
  WALLET_LINK: {
    connector: async () => {
      const WalletLinkConnector = (await import('web3-react-walletlink-connector')).WalletLinkConnector
      return new WalletLinkConnector({
        url: RPC[ChainId.ETHEREUM],
        appName: 'Foxlottery',
        appLogoUrl: '/icons/icon-192x192.png',
        darkMode: true,
      })
    },
    name: 'Coinbase Wallet',
    iconName: 'coinbase.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5',
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconName: 'coinbase.svg',
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true,
  },
  FORTMATIC: {
    connector: async () => {
      const FortmaticConnector = (await import('web3-react-fortmatic-connector')).FortmaticConnector
      return new FortmaticConnector({
        apiKey: process.env.NEXT_PUBLIC_FORTMATIC_API_KEY ?? '',
        chainId: 1,
      })
    },
    name: 'Fortmatic',
    iconName: 'fortmatic.png',
    description: 'Login using Fortmatic hosted wallet',
    href: null,
    color: '#6748FF',
    mobile: true,
  },
  Portis: {
    connector: async () => {
      const PortisConnector = (await import('web3-react-portis-connector')).PortisConnector
      return new PortisConnector({
        dAppId: process.env.NEXT_PUBLIC_PORTIS_ID ?? '',
        networks: [1],
      })
    },
    name: 'Portis',
    iconName: 'portis.png',
    description: 'Login using Portis hosted wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true,
  },
}
