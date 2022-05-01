import { createSlice } from '@reduxjs/toolkit'

export enum ApplicationModal {
  WALLET,
  NETWORK,
}

export interface ApplicationState {
  readonly chainId: number | null
  readonly openModal: ApplicationModal | null
}

const initialState: ApplicationState = {
  chainId: null,
  openModal: null,
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    updateChainId(state, action) {
      const { chainId } = action.payload
      state.chainId = chainId
    },
    setOpenModal(state, action) {
      state.openModal = action.payload
    },
  },
})

export const { updateChainId, setOpenModal } = applicationSlice.actions
export default applicationSlice.reducer
