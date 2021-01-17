import { combineReducers } from 'redux';
import offersReducer from './offersReducer';
import uiContextReducer from './uiContextReducer';

export default combineReducers({
  offers: offersReducer,
  uiContext:uiContextReducer
});