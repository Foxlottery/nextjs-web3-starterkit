import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const { i18n } = useLingui()
  return (
    <>
      Welcome to <a href="https://nextjs.org">Next.js!</a>
      {i18n._(t`test`)}
    </>
  )
}

export default Home
