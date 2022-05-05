const linguiConfig = require('./lingui.config.js')
const { locales } = linguiConfig
const translate = require('deepl')
const fs = require('fs')

const deeplLocales = [
  'BG',
  'CS',
  'DA',
  'DE',
  'EL',
  'EN-GB',
  'EN-US',
  'EN',
  'ES',
  'ET',
  'FI',
  'FR',
  'HU',
  'IT',
  'JA',
  'LT',
  'LV',
  'NL',
  'PL',
  'PT-PT',
  'PT-BR',
  'PT',
  'RO',
  'RU',
  'SK',
  'SL',
  'SV',
  'ZH',
]

function main() {
  const { DEEPL_AUTH_KEY } = process.env
  if (DEEPL_AUTH_KEY) {
    locales.forEach((locale) => {
      const convertedLocale = locale.toUpperCase().replace('_', '-')
      if (deeplLocales.includes(convertedLocale)) {
        translateJson(locale)
      }
    })
  } else {
    console.error(`Please set environment value DEEPL_AUTH_KEY `)
  }
}

async function translateJson(locale) {
  const path = `./locale/${locale}.json`
  const json = require(path)
  for (let key in json) {
    if (!json[key]) {
      json[key] = await getDeeplTranslation(locale, key)
    }
  }

  fs.writeFileSync(path, JSON.stringify(json))
}

async function getDeeplTranslation(locale, key) {
  let translation
  await translate({
    text: key,
    target_lang: locale,
    auth_key: process.env.DEEPL_AUTH_KEY || '',
    free_api: true,
  })
    .then(async (result) => {
      translation = await result.data.translations[0]['text']
    })
    .catch((error) => {
      console.error(error)
    })
  console.log(translation)
  return translation
}

main()
