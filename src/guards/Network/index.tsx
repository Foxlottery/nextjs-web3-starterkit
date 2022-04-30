import { ChainId } from '@foxlottery/core-sdk'
import { t } from '@lingui/macro'
import { Trans, useLingui } from '@lingui/react'
import HeadlessUIModal from 'app/components/Modal/HeadlessUIModal'
import NavLink from 'app/components/NavLink'
import Typography from 'app/components/Typography'
import features from 'app/config/features'
import { NETWORK_ICON, NETWORK_LABEL } from 'app/config/networks'
import { SUPPORTED_NETWORKS, supportedNetworkChainIds } from 'app/config/networks'
import { Feature } from 'app/enums'
import { useActiveWeb3React } from 'app/services/web3'
// @ts-ignore TYPE NEEDS FIXING
import cookie from 'cookie-cutter'
import Image from 'next/image'
import React, { FC, Fragment } from 'react'

interface NetworkGuardProps {
  feature: Feature
  children?: React.ReactNode
  asModal?: boolean
}

const Component: FC<NetworkGuardProps> = ({ children, feature, asModal = true }) => {
  const { i18n } = useLingui()
  const { chainId, library, account } = useActiveWeb3React()

  const link = (
    <NavLink href="/">
      <a className="text-blue focus:outline-none">{i18n._(t`home page`)}</a>
    </NavLink>
  )

  const content = (
    <div className="flex justify-center lg:mt-[200px]">
      <div className="flex flex-col justify-center gap-5 p-4 mt-10 lg:mt-0">
        <Typography variant="h1" className="max-w-2xl text-center text-white" weight={700}>
          {/*@ts-ignore TYPE NEEDS FIXING*/}
          {i18n._(t`This feature is not yet supported on the ${NETWORK_LABEL[chainId]} network`)}
        </Typography>
        <Typography className="text-center max-w-[248px] mx-auto">
          <Trans id="Either return to the {link}" values={{ link }} components={Fragment} />{' '}
          {i18n._(t`or change to an available network`)}
        </Typography>
        <Typography variant="sm" className="uppercase text-center tracking-[.2rem] mt-10 mb-5" weight={700}>
          {i18n._(t`Available Networks`)}
        </Typography>
        <div className="grid grid-cols-[repeat(2,_100px)] md:grid-cols-[repeat(4,_100px)] gap-y-10 justify-center">
          {supportedNetworkChainIds.map((chainId: ChainId, index: number) => (
            <button
              className="flex flex-col items-center justify-center gap-2 text-primary hover:text-white"
              key={index}
              onClick={() => {
                // @ts-ignore TYPE NEEDS FIXING
                const params = SUPPORTED_NETWORKS[chainId]
                cookie.set('chainId', chainId)
                if (chainId === ChainId.ETHEREUM) {
                  library?.send('wallet_switchEthereumChain', [{ chainId: '0x1' }, account])
                } else if (chainId === ChainId.KOVAN) {
                  library?.send('wallet_switchEthereumChain', [{ chainId: '0x2A' }, account])
                } else {
                  library?.send('wallet_addEthereumChain', [params, account])
                }
              }}
            >
              <div className="w-[40px] h-[40px]">
                <Image
                  // @ts-ignore TYPE NEEDS FIXING
                  src={NETWORK_ICON[chainId]}
                  alt="Switch Network"
                  className="rounded-md filter drop-shadow-currencyLogo"
                  width="40px"
                  height="40px"
                />
              </div>
              <Typography variant="sm" weight={700} className="text-white">
                {/*@ts-ignore TYPE NEEDS FIXING*/}
                {NETWORK_LABEL[chainId]}
              </Typography>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  if (!asModal) {
    // @ts-ignore TYPE NEEDS FIXING
    if (!!account && !features[chainId].includes(feature)) {
      return content
    }

    return <>{children}</>
  }

  return (
    <>
      <HeadlessUIModal.Controlled
        // @ts-ignore TYPE NEEDS FIXING
        isOpen={!!account && !features[chainId]?.includes(feature)}
        onDismiss={() => null}
        transparent={true}
      >
        {content}
      </HeadlessUIModal.Controlled>
      {children}
    </>
  )
}

type NetworkGuard = (feature: Feature, renderChildren?: boolean) => FC
const NetworkGuard: NetworkGuard = (feature: Feature, renderChildren = true) => {
  if (!renderChildren) {
    return ({ children }) => (
      <Component feature={feature} asModal={false}>
        {children}
      </Component>
    )
  }

  return ({ children }) => <Component feature={feature}>{children}</Component>
}

export default NetworkGuard
