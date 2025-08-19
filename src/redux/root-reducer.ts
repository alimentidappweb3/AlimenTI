import { combineReducers } from 'redux'
import marketReducer from './market/reducer';

const rootReducer = combineReducers({marketReducer});

export default rootReducer