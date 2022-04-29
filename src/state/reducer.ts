import { combineReducers } from '@reduxjs/toolkit'

import application from './application/reducer'

const reducer = combineReducers({
  application,
})

export default reducer
