/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import useMenu, { MenuItem } from 'app/components/Header/useMenu'
import config from 'app/config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

const Header: FC = () => {
  const menu = useMenu()
  const router = useRouter()
  const { serviceIcon, serviceName } = config

  return (
    <Disclosure as="nav" className="w-full bg-white shadow">
      {({ open }) => (
        <>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/" passHref>
                  <div className="flex items-center flex-shrink-0 cursor-pointer">
                    <div className="w-6 h-6" dangerouslySetInnerHTML={{ __html: serviceIcon }} />
                    <h2 className="pl-2 font-semibold tracking-wide">{serviceName}</h2>
                  </div>
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {menu.map((menuItem: MenuItem) => {
                    const isActive = menuItem.link == router.pathname
                    if (menuItem.link) {
                      return (
                        <Link key={menuItem.key} href={menuItem.link} passHref>
                          <div
                            className={`border-transparent text-gray-500 ${
                              isActive ? 'border-gray-300' : null
                            } hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                          >
                            {menuItem.title}
                          </div>
                        </Link>
                      )
                    }
                  })}
                </div>
              </div>
              <div className="flex items-center -mr-2 sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {menu.map((menuItem: MenuItem) => {
                const isActive = menuItem.link == router.pathname
                if (menuItem.link) {
                  return (
                    <Link key={menuItem.key} href={menuItem.link} passHref>
                      <Disclosure.Button
                        as="div"
                        className={`border-transparent text-gray-500 ${
                          isActive ? 'bg-gray-50' : null
                        } hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                      >
                        {menuItem.title}
                      </Disclosure.Button>
                    </Link>
                  )
                }
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Header
