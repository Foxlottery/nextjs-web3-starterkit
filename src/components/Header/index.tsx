import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import CurrentCryptoCurrencyAmount from 'app/components/CurrentCryptoCurrencyAmount'
import SwitchLanguages from 'app/components/SwitchLanguages'
import Web3Network from 'app/components/Web3Network'
import Web3WalletStatus from 'app/components/Web3WalletStatus'
import config from 'app/config'
import headerConfig from 'app/config/header'
import useIsCoinbaseWallet from 'app/hooks/useIsCoinbaseWallet'
import { useActiveWeb3React } from 'app/services/web3'
import { MenuItem } from 'app/types/MenuItem'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

const Header = () => {
  const { serviceIcon, serviceName } = config
  const router = useRouter()
  const { i18n } = useLingui()
  const header = headerConfig(i18n)
  const { library } = useActiveWeb3React()
  const isCoinbaseWallet = useIsCoinbaseWallet()

  return (
    <Popover className="relative w-full bg-white">
      <div className="flex items-center justify-between px-4 py-5 sm:px-6 sm:py-2 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link href="/" passHref>
            <div className="flex items-center flex-shrink-0 cursor-pointer">
              <div className="w-6 h-6" dangerouslySetInnerHTML={{ __html: serviceIcon }} />
              <h2 className="pl-2 font-semibold tracking-wide">{serviceName}</h2>
            </div>
          </Link>
        </div>

        <div className="flex -my-2 -mr-2 md:hidden">
          {library && (library.provider.isMetaMask || isCoinbaseWallet) && <Web3Network />}
          <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
            <span className="sr-only">Open menu</span>
            <MenuIcon className="w-6 h-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        <Popover.Group as="nav" className="hidden space-x-10 md:flex">
          {header.menuItems.map((menuItem: MenuItem) => {
            const isActive = menuItem.link == router.pathname

            if (menuItem.link) {
              return (
                <Link key={menuItem.key} href={menuItem.link} passHref>
                  <div
                    className={`text-base font-medium pb-1 px-1 text-gray-500 hover:text-gray-900 cursor-pointer ${
                      isActive ? 'border-gray-300 border-b-2' : null
                    }`}
                  >
                    {menuItem.title}
                  </div>
                </Link>
              )
            }
          })}
        </Popover.Group>

        <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
          <div className="mx-1">
            <Web3WalletStatus />
          </div>
          {library && (library.provider.isMetaMask || isCoinbaseWallet) && <Web3Network />}
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden">
          <div className="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <Link href="/" passHref>
                  <div className="flex items-center flex-shrink-0 cursor-pointer">
                    <div className="w-6 h-6" dangerouslySetInnerHTML={{ __html: serviceIcon }} />
                    <h2 className="pl-2 font-semibold tracking-wide">{serviceName}</h2>
                  </div>
                </Link>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="w-6 h-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid grid-cols-1">
                  {header.menuItems.map((menuItem: MenuItem) => {
                    const isActive = menuItem.link == router.pathname
                    if (menuItem.link) {
                      return (
                        <Link key={menuItem.key} href={menuItem.link} passHref>
                          <Popover.Button
                            as="div"
                            className={`border-transparent text-gray-500 ${
                              isActive ? 'bg-gray-100' : null
                            } hover:bg-gray-100 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                          >
                            {menuItem.title}
                          </Popover.Button>
                        </Link>
                      )
                    }
                  })}
                </nav>
              </div>
            </div>
            <div className="grid grid-cols-1 px-5 py-5">
              <div className="pl-3">
                <CurrentCryptoCurrencyAmount />
              </div>
              <Web3WalletStatus />
            </div>
            <div className="py-5 mx-3 mb-5 border-t-2 border-gray-50">
              <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">{i18n._(t`Language`)}</h3>
              <form className="mt-4 sm:max-w-xs">
                <fieldset className="w-full">
                  <SwitchLanguages />
                </fieldset>
              </form>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default Header
