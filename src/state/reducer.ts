import { combineReducers } from '@reduxjs/toolkit'

import application from './application/reducer'
import lists from './lists/reducer'
import logs from './logs/slice'
import tokens from './tokens/slice'
import transactions from './transactions/reducer'

const reducer = combineReducers({
  application,
  tokens,
  transactions,
  lists,
  logs,
})

export default reducer
