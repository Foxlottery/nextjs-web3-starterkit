import { combineReducers } from '@reduxjs/toolkit'
import multicall from 'app/lib/state/multicall'

import application from './application/reducer'
import logs from './logs/slice'

const reducer = combineReducers({
  application,
  logs,
  multicall: multicall.reducer,
})

export default reducer
