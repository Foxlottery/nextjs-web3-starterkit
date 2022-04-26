/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import useMenu, { MenuItem } from 'app/components/Header/useMenu'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

const Header: FC = () => {
  const { SERVICE_NAME } = process.env
  const menu = useMenu()
  const router = useRouter()

  return (
    <Disclosure as="nav" className="bg-white shadow w-full">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/" passHref>
                  <div className="flex-shrink-0 flex items-center cursor-pointer">
                    <Image
                      className="h-6 w-auto"
                      src="/images/foxlottery.svg"
                      alt={SERVICE_NAME}
                      width="24px"
                      height="24px"
                    />
                    <h2 className="font-bold pl-2 tracking-wide">{SERVICE_NAME}</h2>
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
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
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
