import { combineReducers } from '@reduxjs/toolkit'
import multicall from 'app/lib/state/multicall'

import application from './application/reducer'
import logs from './logs/slice'
import tokens from './tokens/slice'
import transactions from './transactions/reducer'
import user from './user/reducer'

const reducer = combineReducers({
  application,
  tokens,
  transactions,
  logs,
  multicall: multicall.reducer,
  user,
})

export default reducer
