import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ReactNode, useMemo } from 'react'

export interface MenuItemLeaf {
  key: string
  title: string
  link: string
  icon?: ReactNode
}

export interface MenuItemNode {
  key: string
  title: string
  items: MenuItemLeaf[]
  icon?: ReactNode
  link?: string
}

export type MenuItem = MenuItemLeaf | MenuItemNode
export type Menu = MenuItem[]

type UseMenu = () => Menu
const useMenu: UseMenu = () => {
  const { i18n } = useLingui()

  return useMemo(() => {
    const menu: Menu = [
      {
        key: 'lottery',
        title: i18n._(t`Lottery`),
        icon: null,
        link: `/`,
      },
      {
        key: 'dashboard',
        title: i18n._(t`Dashboard`),
        icon: null,
        link: `/dashboard`,
      },
    ]

    return menu.filter((el) => Object.keys(el).length > 0)
  }, [i18n])
}

export default useMenu
