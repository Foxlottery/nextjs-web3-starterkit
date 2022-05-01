import Davatar from '@davatar/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { HeadlessUiModal } from 'app/components/Modal'
import { injected, SUPPORTED_WALLETS } from 'app/config/wallets'
import { getExplorerLink } from 'app/functions/explorer'
import { shortenAddress } from 'app/functions/format'
import { useActiveWeb3React } from 'app/services/web3'
import Image from 'next/image'
import React, { FC, useMemo } from 'react'
import { ExternalLink as LinkIcon } from 'react-feather'
import { WalletLinkConnector } from 'web3-react-walletlink-connector'

import Button from '../Button'
import ExternalLink from '../ExternalLink'
import Typography from '../Typography'
import Copy from './Copy'

interface AccountDetailsProps {
  toggleWalletModal: () => void
  ENSName?: string
}

const AccountDetails: FC<AccountDetailsProps> = ({ toggleWalletModal, ENSName }) => {
  const { i18n } = useLingui()
  const { chainId, account, connector, deactivate, library } = useActiveWeb3React()

  const isMetaMask = useMemo(() => {
    const { ethereum } = window
    return !!(ethereum && ethereum.isMetaMask)
  }, [])

  const connectorName = useMemo(() => {
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        (k) =>
          SUPPORTED_WALLETS[k].connector === connector && (connector !== injected || isMetaMask === (k === 'METAMASK'))
      )
      .map((k) => SUPPORTED_WALLETS[k].name)[0]
    return (
      <Typography variant="xs" weight={700} className="text-secondary">
        Connected with {name}
      </Typography>
    )
  }, [connector, isMetaMask])

  return (
    <div className="space-y-3">
      <div className="space-y-3">
        <HeadlessUiModal.Header header={i18n._(t`Account`)} onClose={toggleWalletModal} />
        <HeadlessUiModal.BorderedContent className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            {connectorName}
            {connector !== injected && !(connector instanceof WalletLinkConnector) && (
              <Button variant="outlined" color="blue" size="xs" onClick={deactivate}>
                {i18n._(t`Disconnect`)}
              </Button>
            )}

            {/* <Button variant="outlined" color="blue" size="xs" onClick={deactivate}>
              {i18n._(t`Change`)}
            </Button> */}
          </div>
          <div id="web3-account-identifier-row" className="flex flex-col justify-center gap-4">
            <div className="flex items-center gap-4">
              <div className="overflow-hidden rounded-full">
                <Davatar
                  size={48}
                  // @ts-ignore TYPE NEEDS FIXING
                  address={account}
                  defaultComponent={<Image src="/images/user.svg" alt="User Icon" width={48} height={48} />}
                  provider={library}
                />
              </div>
              <Typography weight={700} variant="lg" className="text-white">
                {ENSName ? ENSName : account && shortenAddress(account)}
              </Typography>
            </div>
            <div className="flex items-center gap-2 space-x-3">
              {chainId && account && (
                <ExternalLink
                  color="blue"
                  startIcon={<LinkIcon size={16} />}
                  href={getExplorerLink(chainId, ENSName || account, 'address')}
                >
                  <Typography variant="xs" weight={700}>
                    {i18n._(t`View on explorer`)}
                  </Typography>
                </ExternalLink>
              )}
              {account && (
                <Copy toCopy={account}>
                  <Typography variant="xs" weight={700}>
                    {i18n._(t`Copy Address`)}
                  </Typography>
                </Copy>
              )}
            </div>
          </div>
        </HeadlessUiModal.BorderedContent>
      </div>
    </div>
  )
}

export default AccountDetails
