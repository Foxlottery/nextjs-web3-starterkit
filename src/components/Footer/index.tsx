import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import SwitchLanguages from 'app/components/SwitchLanguages'
import config from 'app/config'
import Link from 'next/link'
import React, { FC } from 'react'

const Footer: FC = () => {
  const { footer, serviceIcon, serviceName } = config
  const { i18n } = useLingui()

  return (
    <footer className="w-full bg-white" aria-labelledby="footer-heading">
      <div className="px-4 pt-12 pb-6 mx-auto max-w-7xl sm:px-6 lg:py-12 lg:px-6">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" passHref>
              <div className="flex items-center flex-shrink-0 cursor-pointer">
                <div className="w-6 h-6" dangerouslySetInnerHTML={{ __html: serviceIcon }} />
                <h2 className="pl-2 font-semibold tracking-wide">{serviceName}</h2>
              </div>
            </Link>
            <p className="text-base text-gray-500">{footer.description}</p>
            <div className="flex space-x-6">
              {footer.iconLinks.map((icon_link) => (
                <Link key={icon_link.key} href={icon_link.link} passHref>
                  <div className="text-gray-400 hover:text-gray-500">
                    <div className="w-6 h-6" dangerouslySetInnerHTML={{ __html: icon_link.icon }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-12 xl:mt-0 xl:col-span-2">
            <div className="grid grid-cols-2 md:grid md:grid-cols-4 md:gap-8">
              {footer.menus.map((menu) => (
                <div className="mb-3" key={menu.title}>
                  <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">{menu.title}</h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {menu.menuItems.map((menuItem, index) => (
                      <li key={index}>
                        <a href={menuItem.link} className="text-base text-gray-500 hover:text-gray-900">
                          {menuItem.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Language</h3>
                <form className="mt-4 sm:max-w-xs">
                  <fieldset className="w-full">
                    <label htmlFor="language" className="sr-only">
                      {i18n._(t`Language`)}
                    </label>
                    <SwitchLanguages />
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 mt-12 border-t border-gray-200">
          <p className="text-base text-gray-400 xl:text-center">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
