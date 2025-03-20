import { configureStore, combineSlices } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from '../services/ingredients/ingredientSlice';
import { constructorSlice } from '../services/burger-constructor/constructorslice';
import { feedSlice } from '../services/feed/feedSlice';
import { userSlice } from '../services/user/userSlice';
import { orderSlice } from '../services/Order/OrderSlice';
import { profileOrderSlice } from '../services/profile-orders/profileOrderSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  orderSlice,
  feedSlice,
  userSlice,
  profileOrderSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
