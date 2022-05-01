import { createStore, Store } from 'redux'

import { ApplicationModal, setOpenModal } from './reducer'
import reducer, { ApplicationState } from './reducer'

describe('application reducer', () => {
  let store: Store<ApplicationState>

  beforeEach(() => {
    // @ts-ignore TYPE NEEDS FIXING
    store = createStore(reducer, {
      openModal: null,
    })
  })

  describe('setOpenModal', () => {
    it('set wallet modal', () => {
      store.dispatch(setOpenModal(ApplicationModal.WALLET))
      expect(store.getState().openModal).toEqual(ApplicationModal.WALLET)
      store.dispatch(setOpenModal(ApplicationModal.WALLET))
      expect(store.getState().openModal).toEqual(ApplicationModal.WALLET)
      store.dispatch(setOpenModal(null))
      expect(store.getState().openModal).toEqual(null)
    })
  })
})
