import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import HeadlessUiModal from 'app/components/Modal/HeadlessUIModal'
import Typography from 'app/components/Typography'
import { NETWORK_ICON, NETWORK_LABEL } from 'app/config/networks'
import { SUPPORTED_NETWORKS, supportedNetworkChainIds } from 'app/config/networks'
import { classNames } from 'app/functions'
import { switchToNetwork } from 'app/functions/network'
import { useActiveWeb3React } from 'app/services/web3'
import { useIsModalOpen, useToggleModal } from 'app/state/application/hooks'
import { ApplicationModal } from 'app/state/application/reducer'
import Image from 'next/image'
import React, { FC } from 'react'

const NetworkModal: FC = () => {
  const { i18n } = useLingui()
  const { chainId, library, account } = useActiveWeb3React()
  const isNetworkModalOpen = useIsModalOpen(ApplicationModal.NETWORK)
  const toggleNetworkModal = useToggleModal(ApplicationModal.NETWORK)

  if (!chainId) return null

  return (
    <HeadlessUiModal.Controlled isOpen={isNetworkModalOpen} onDismiss={toggleNetworkModal}>
      <div className="flex flex-col gap-4">
        <HeadlessUiModal.Header header={i18n._(t`Select a network`)} onClose={toggleNetworkModal} />
        <div className="grid grid-flow-row-dense grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2">
          {supportedNetworkChainIds
            .sort((key) => (chainId === key ? -1 : 0))
            .map((key: number, i: number) => {
              if (chainId === key) {
                return (
                  <div
                    key={i}
                    className="flex items-center w-full gap-4 px-4 py-3 bg-gray-100 rounded cursor-default focus:outline-none"
                  >
                    <Image
                      // @ts-ignore TYPE NEEDS FIXING
                      src={NETWORK_ICON[key]}
                      alt="Switch Network"
                      className="rounded-full"
                      width="32px"
                      height="32px"
                    />
                    <Typography weight={700} className="text-high-emphesis">
                      {NETWORK_LABEL[key]}
                    </Typography>
                  </div>
                )
              }
              return (
                <button
                  key={i}
                  onClick={async () => {
                    console.debug(`Switching to chain ${Number(key)}`, SUPPORTED_NETWORKS[key])
                    toggleNetworkModal()
                    const params = SUPPORTED_NETWORKS[key]
                    try {
                      if (!library?.provider) {
                        return
                      }
                      switchToNetwork({ provider: library?.provider, chainId: Number(key) })
                    } catch (switchError) {
                      // This error code indicates that the chain has not been added to MetaMask.
                      // @ts-ignore TYPE NEEDS FIXING
                      if (switchError.code === 4902) {
                        try {
                          await library?.send('wallet_addEthereumChain', [params, account])
                        } catch (addError) {
                          // handle "add" error
                          console.error(`Add chain error ${addError}`)
                        }
                      }
                      console.error(`Switch chain error ${switchError}`)
                      // handle other "switch" errors
                    }
                  }}
                  className={classNames(
                    'bg-gray-200 focus:outline-none flex items-center gap-4 w-full px-4 py-3 rounded border'
                  )}
                >
                  {/*@ts-ignore TYPE NEEDS FIXING*/}
                  <Image
                    src={NETWORK_ICON[key]}
                    alt="Switch Network"
                    className="rounded-full"
                    width="32px"
                    height="32px"
                  />
                  <Typography weight={700} className="text-high-emphesis">
                    {NETWORK_LABEL[key]}
                  </Typography>
                </button>
              )
            })}
        </div>
      </div>
    </HeadlessUiModal.Controlled>
  )
}

export default NetworkModal
