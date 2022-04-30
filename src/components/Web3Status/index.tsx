import Davatar from '@davatar/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { NetworkContextName } from 'app/constants'
import { shortenAddress } from 'app/functions'
import { isTxConfirmed, isTxPending } from 'app/functions/transactions'
import useENSName from 'app/hooks/useENSName'
import WalletModal from 'app/modals/WalletModal'
import { useWalletModalToggle } from 'app/state/application/hooks'
import { isTransactionRecent, useAllTransactions } from 'app/state/transactions/hooks'
import { TransactionDetails } from 'app/state/transactions/reducer'
import Image from 'next/image'
import React, { useMemo } from 'react'
import { useWeb3React } from 'web3-react-core'

import Loader from '../Loader'
import Typography from '../Typography'
import Web3Connect from '../Web3Connect'

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

function Web3StatusInner() {
  const { i18n } = useLingui()
  const { account, library } = useWeb3React()

  const { ENSName, loading } = useENSName(account ?? undefined)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter(isTxPending).map((tx) => tx.hash)

  const hasPendingTransactions = !!pending.length

  const toggleWalletModal = useWalletModalToggle()

  if (account) {
    return (
      <div
        id="web3-status-connected"
        className="flex items-center w-40 gap-2 ml-4 text-sm bg-gray-200 rounded-lg sm:w-28 text-primary sm:bg-white sm:ml-0"
        onClick={toggleWalletModal}
      >
        {hasPendingTransactions ? (
          <div className="flex items-center justify-between gap-2">
            <div>
              {pending?.length} {i18n._(t`Pending`)}
            </div>{' '}
            <Loader stroke="white" />
          </div>
        ) : (
          <div className="relative flex items-center gap-2 cursor-pointer pointer-events-auto">
            <Typography weight={700} variant="sm" className="px-2 py-5 font-bold rounded-full text-inheri">
              {ENSName ? ENSName.toUpperCase() : shortenAddress(account)}
            </Typography>

            <div className="inline-block sm:hidden">
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
        )}
        {/* {!hasPendingTransactions && connector && (
          <StatusIcon connector={connector} account={account} provider={library} />
        )} */}
      </div>
    )
  } else {
    return (
      <Web3Connect
        size="sm"
        className="!bg-dark-900 bg-gradient-to-r from-pink/80 hover:from-pink to-purple/80 hover:to-purple text-white h-[38px]"
      />
    )
  }
}

export default function Web3Status() {
  const { active, account } = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)

  const { ENSName } = useENSName(account ?? undefined)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter(isTxPending).map((tx) => tx.hash)
  const confirmed = sortedRecentTransactions.filter(isTxConfirmed).map((tx) => tx.hash)

  if (!contextNetwork.active && !active) {
    return null
  }

  return (
    <>
      <Web3StatusInner />
      <WalletModal ENSName={ENSName ?? undefined} pendingTransactions={pending} confirmedTransactions={confirmed} />
    </>
  )
}
