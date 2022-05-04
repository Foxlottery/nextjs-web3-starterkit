/** @type {import('next').NextConfig} */
const linguiConfig = require('./lingui.config.js')
const { locales, sourceLocale } = linguiConfig
const defaultTheme = require('tailwindcss/defaultTheme')

const { ChainId } = require('@foxlottery/core-sdk')
const { screens } = defaultTheme

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs')

const nextConfig = {
  webpack: (config) => {
    config.module.rules = [
      ...config.module.rules,
      {
        resourceQuery: /raw-lingui/,
        type: 'javascript/auto',
      },
    ]

    return config
  },
  reactStrictMode: true,
  i18n: {
    localeDetection: true,
    locales,
    defaultLocale: sourceLocale,
  },
  publicRuntimeConfig: {
    breakpoints: screens,

    [ChainId.ETHEREUM]: {
      features: [],
    },
  },
  env: {
    GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
    DOMAIN: process.env.DOMAIN || 'app.foxlottery.org',
  },
}

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  silent: true,
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

const { NEXT_PUBLIC_SENTRY_DSN } = process.env
// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
if (NEXT_PUBLIC_SENTRY_DSN) {
  module.exports = withSentryConfig(nextConfig, SentryWebpackPluginOptions)
} else {
  module.exports = nextConfig
}

// Don't delete this console log, useful to see the config in Vercel deployments
// console.log('next.config.js', JSON.stringify(module.exports, null, 2))
