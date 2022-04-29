import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ExampleModalButton from 'app/components/ExampleModalButton'
import ExampleModal from 'app/modals/ExampleModal'
import type { NextPage } from 'next'

const Dashboard: NextPage = () => {
  const { i18n } = useLingui()

  return (
    <>
      {i18n._(t`Dashboard`)}
      <ExampleModal />
      <ExampleModalButton />
    </>
  )
}

export default Dashboard
