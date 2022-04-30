import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import type { NextPage } from 'next'

const Dashboard: NextPage = () => {
  const { i18n } = useLingui()

  return (
    <>
      <div className="px-5 py-5 border-b border-gray-200 w-80">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{i18n._(t`Dashboard`)}</h3>
      </div>
    </>
  )
}

export default Dashboard
