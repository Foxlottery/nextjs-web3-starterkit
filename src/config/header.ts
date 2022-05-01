import { I18n } from '@lingui/core'
import { t } from '@lingui/macro'

const header = (i18n: I18n) => {
  return {
    menuItems: [
      { key: 'lottery', title: i18n._(t`Lottery`), link: `/` },
      { key: 'dashboard', title: i18n._(t`Dashboard`), link: `/dashboard` },
    ],
  }
}

export default header
