import { combineReducers, configureStore } from '@reduxjs/toolkit';
import alertSlice from './alertSlice';
import usersslice from './usersslice';
const rootReducer = combineReducers({
  alerts: alertSlice,
  users: usersslice,
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;
