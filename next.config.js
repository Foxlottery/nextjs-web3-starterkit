/** @type {import('next').NextConfig} */
const linguiConfig = require('./lingui.config.js')
const { locales, sourceLocale } = linguiConfig
const defaultTheme = require('tailwindcss/defaultTheme')

const { ChainId } = require('@foxlottery/core-sdk')
const { screens } = defaultTheme

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
  },
}

module.exports = nextConfig
