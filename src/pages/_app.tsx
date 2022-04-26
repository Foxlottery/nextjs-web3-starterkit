import '../styles/index.css'

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { remoteLoader } from '@lingui/remote-loader'
import DefaultLayout from 'app/layouts/Default'
import * as plurals from 'make-plural/plurals'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

function MyApp({ Component, pageProps }: any) {
  const router = useRouter()
  const { locale } = router

  useEffect(() => {
    // @ts-ignore TYPE NEEDS FIXING
    async function load(locale) {
      // @ts-ignore TYPE NEEDS FIXING
      i18n.loadLocaleData(locale, { plurals: plurals[locale.split('_')[0]] })

      try {
        // Load messages from AWS, use q session param to get latest version from cache
        const remoteMessages = import(`../../locale/${locale}.json`)

        const messages = remoteLoader({
          messages: remoteMessages,
          format: 'minimal',
        })
        i18n.load(locale, messages)
      } catch {
        // Load fallback messages
        const { messages } = await import(`@lingui/loader!./../../locale/${locale}.json?raw-lingui`)
        i18n.load(locale, messages)
      }

      i18n.activate(locale)
    }

    load(locale)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  // Allows for conditionally setting a layout to be hoisted per page
  const Layout = Component.Layout || DefaultLayout

  return (
    <>
      <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </I18nProvider>
    </>
  )
}

export default MyApp
