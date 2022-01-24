
import {combineReducers} from 'redux'
import { loginReducer } from './loginReduser'

export const rootReducer = combineReducers({login: loginReducer})

