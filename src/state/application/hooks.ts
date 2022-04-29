import { useAppDispatch } from 'app/state/hooks'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from '..'
import { ApplicationModal, setOpenModal } from './reducer'

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useSelector((state: AppState) => state.application.openModal)
  return openModal === modal
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal)
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open])
}
