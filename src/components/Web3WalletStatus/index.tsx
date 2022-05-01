import Davatar from '@davatar/react'
import { NetworkContextName } from 'app/constants'
import { shortenAddress } from 'app/functions'
import useENSName from 'app/hooks/useENSName'
import WalletModal from 'app/modals/WalletModal'
import { useWalletModalToggle } from 'app/state/application/hooks'
import Image from 'next/image'
import React from 'react'
import { useWeb3React } from 'web3-react-core'

import Typography from '../Typography'
import Web3Connect from '../Web3Connect'

function Web3WalletStatusInner() {
  const { account, library } = useWeb3React()

  const { ENSName } = useENSName(account ?? undefined)

  const toggleWalletModal = useWalletModalToggle()

  if (account) {
    return (
      <div
        id="web3-status-connected"
        className="flex items-center gap-2 ml-4 text-sm bg-gray-200 rounded-lg w-44 sm:w-28 text-primary sm:ml-0"
        onClick={toggleWalletModal}
      >
        <div className="relative flex items-center gap-2 cursor-pointer pointer-events-auto">
          <Typography weight={700} variant="sm" className="px-2 py-5 font-semibold rounded-full text-inheri">
            {ENSName ? ENSName.toUpperCase() : shortenAddress(account)}
          </Typography>

          <div className="flex items-center sm:hidden">
            <Davatar
              size={48}
              address={account}
              defaultComponent={
                <Image
                  src="/images/user.svg"
                  alt="User Icon"
                  width={36}
                  height={36}
                  className="rounded-full pointer-events-none"
                />
              }
              provider={library}
            />
          </div>
        </div>
      </div>
    )
  } else {
    return <Web3Connect size="sm" className="bg-gray-200 mx-2 hover:bg-gray-200 text-black h-[38px]" />
  }
}

export default function Web3WalletStatus() {
  const { active, account } = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)
  const { ENSName } = useENSName(account ?? undefined)

  if (!contextNetwork.active && !active) {
    return null
  }

  return (
    <>
      <Web3WalletStatusInner />
      <WalletModal ENSName={ENSName ?? undefined} />
    </>
  )
}
