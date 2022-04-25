import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import type { NextPage } from 'next'

import styles from '../../styles/Home.module.css'

const Home: NextPage = () => {
  const { i18n } = useLingui()
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
          {i18n._(t`test`)}
          {i18n.locale}
        </h1>
      </main>
    </div>
  )
}

export default Home
