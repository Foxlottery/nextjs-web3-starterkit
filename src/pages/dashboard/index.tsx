import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import NetworkModal from 'app/modals/NetworkModal'
import type { NextPage } from 'next'

const Dashboard: NextPage = () => {
  const { i18n } = useLingui()

  return (
    <>
      {i18n._(t`Dashboard`)}
      <NetworkModal />
    </>
  )
}

export default Dashboard
