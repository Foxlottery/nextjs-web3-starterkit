import { DEFAULT_TXN_DISMISS_MS } from 'app/constants'
import { useAppDispatch } from 'app/state/hooks'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from '..'
import { addPopup, ApplicationModal, PopupContent, removePopup, setOpenModal } from './reducer'

export function useIsModalOpen(modal: ApplicationModal): boolean {
  const openModal = useSelector((state: AppState) => state.application.openModal)
  return openModal === modal
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const isOpen = useIsModalOpen(modal)
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(setOpenModal(isOpen ? null : modal)), [dispatch, modal, isOpen])
}

export function useNetworkModalToggle(): () => void {
  return useToggleModal(ApplicationModal.NETWORK)
}

export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET)
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string, removeAfterMs?: number) => void {
  const dispatch = useAppDispatch()

  return useCallback(
    (content: PopupContent, key?: string, removeAfterMs?: number) => {
      dispatch(addPopup({ content, key, removeAfterMs: removeAfterMs ?? DEFAULT_TXN_DISMISS_MS }))
    },
    [dispatch]
  )
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }))
    },
    [dispatch]
  )
}
