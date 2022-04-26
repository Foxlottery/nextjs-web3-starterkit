export interface MenuItemLeaf {
  key: string
  title: string
  link: string
  icon?: string
}

export interface MenuItemNode {
  key: string
  title: string
  items: MenuItemLeaf[]
  icon?: string
  link?: string
}

export type MenuItem = MenuItemLeaf | MenuItemNode
