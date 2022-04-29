import '../styles/index.css'

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { remoteLoader } from '@lingui/remote-loader'
import DefaultLayout from 'app/layouts/Default'
import store from 'app/state'
import * as plurals from 'make-plural/plurals'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { DefaultSeo } from 'next-seo'
import React, { useEffect } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import SEO from '../config/seo'

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
        `,
          }}
        />
      ) : null}
      {/* End Google Tag Manager */}
      <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
        <ReduxProvider store={store}>
          <Layout>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </Layout>
        </ReduxProvider>
      </I18nProvider>
    </>
  )
}

export default MyApp
