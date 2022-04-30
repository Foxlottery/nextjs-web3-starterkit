import { useLingui } from '@lingui/react'
import { Feature } from 'app/enums'
import NetworkGuard from 'app/guards/Network'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const { i18n } = useLingui()
  return (
    <>
      <div className="my-10 shadow bg-gray-50 sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <div className="relative mt-5 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                name="price"
                id="price"
                className="block w-full pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm"
                placeholder="0.00"
                aria-describedby="price-currency"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  USD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Home.Guard = NetworkGuard(Feature.LOTTERY)

export default Home
