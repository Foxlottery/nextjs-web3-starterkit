import { ChevronDownIcon } from '@heroicons/react/solid'
import config from 'app/config'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

const SwitchLanguages: FC = () => {
  const { locale, locales, asPath, push } = useRouter()
  const LOCALE_KEY_VALUES: Record<string, string> = config.lingui.displayNames

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e: any) => {
    push(asPath, undefined, { locale: e.target.value })
  }

  return (
    <div className="relative">
      <select
        onChange={handleChange}
        className="block w-full py-2 pl-3 pr-10 text-base text-gray-900 bg-white border border-gray-300 rounded-md appearance-none bg-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        defaultValue={locale}
      >
        {locales?.map((locale) => {
          const localeName = locale && LOCALE_KEY_VALUES[locale]
          return (
            <option value={locale} key={locale}>
              {localeName}
            </option>
          )
        })}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <ChevronDownIcon className="w-4 h-4 text-gray-400" aria-hidden="true" />
      </div>
    </div>
  )
}

export default SwitchLanguages
