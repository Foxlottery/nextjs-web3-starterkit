import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Feature } from 'app/enums'
import NetworkGuard from 'app/guards/Network'

const Home = () => {
  const { i18n } = useLingui()
  return (
    <>
      <div className="h-96">
        <div className="px-5 py-5 border-b border-gray-200 w-80">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{i18n._(t`Lottery`)}</h3>
        </div>
      </div>
    </>
  )
}

Home.Guard = NetworkGuard(Feature.LOTTERY)

export default Home
