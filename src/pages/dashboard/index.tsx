import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import type { NextPage } from 'next'

const Dashboard: NextPage = () => {
  const { i18n } = useLingui()
  return <>{i18n._(t`Dashboard`)}</>
}

export default Dashboard
