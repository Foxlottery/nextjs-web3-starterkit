import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const { i18n } = useLingui()
  return <>{i18n._(t`Lottery`)}</>
}

export default Home
