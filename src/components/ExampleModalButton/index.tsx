import { useToggleModal } from 'app/state/application/hooks'
import { ApplicationModal } from 'app/state/application/reducer'
import { FC } from 'react'

const ExampleModalButton: FC = () => {
  return (
    <button
      type="button"
      className="inline-flex justify-center px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
      onClick={useToggleModal(ApplicationModal.WALLET)}
    >
      open modal
    </button>
  )
}
export default ExampleModalButton
