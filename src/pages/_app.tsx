import '../styles/index.css'

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { remoteLoader } from '@lingui/remote-loader'
import Web3ReactManager from 'app/components/Web3ReactManager'
import getLibrary from 'app/functions/getLibrary'
import DefaultLayout from 'app/layouts/Default'
import { BlockUpdater } from 'app/lib/hooks/useBlockNumber'
import { MulticallUpdater } from 'app/lib/state/multicall'
import store, { persistor } from 'app/state'
import ApplicationUpdater from 'app/state/application/updater'
import LogsUpdater from 'app/state/logs/updater'
import TransactionUpdater from 'app/state/transactions/updater'
import UserUpdater from 'app/state/user/updater'
import * as plurals from 'make-plural/plurals'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { DefaultSeo } from 'next-seo'
import React, { Fragment, useEffect } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Web3ReactProvider } from 'web3-react-core'

const Web3ProviderNetwork = dynamic(() => import('../components/Web3ProviderNetwork'), { ssr: false })

import SEO from '../config/seo'

if (typeof window !== 'undefined' && !!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

function MyApp({ Component, pageProps }: any) {
  const router = useRouter()
  const { locale } = router
  const { GOOGLE_TAG_MANAGER_ID } = process.env

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

  // Allows for conditionally setting a guard to be hoisted per page
  const Guard = Component.Guard || Fragment

  return (
    <>
      {/* Google Tag Manager */}
      {GOOGLE_TAG_MANAGER_ID ? (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer', '${GOOGLE_TAG_MANAGER_ID}');
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        `,
          }}
        />
      ) : null}
      {/* End Google Tag Manager */}
      <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ProviderNetwork getLibrary={getLibrary}>
            <Web3ReactManager>
              <ReduxProvider store={store}>
                <PersistGate persistor={persistor}>
                  <>
                    <UserUpdater />
                    <ApplicationUpdater />
                    <TransactionUpdater />
                    <BlockUpdater />
                    <MulticallUpdater />
                    <LogsUpdater />
                  </>

                  <Guard>
                    <Layout>
                      <DefaultSeo {...SEO} />
                      <Component {...pageProps} />
                    </Layout>
                  </Guard>
                </PersistGate>
              </ReduxProvider>
            </Web3ReactManager>
          </Web3ProviderNetwork>
        </Web3ReactProvider>
      </I18nProvider>
    </>
  )
}

export default MyApp
