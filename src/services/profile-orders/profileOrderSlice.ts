import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getProfileOrder } from './action';

export interface IProfileOrderState {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: IProfileOrderState = {
  orders: [],
  isLoading: true,
  error: null
};

export const profileOrderSlice = createSlice({
  name: 'profileOrder',
  initialState,
  selectors: {
    selectProfileOrders: (state) => state.orders
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfileOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getProfileOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  }
});

export const { selectProfileOrders } = profileOrderSlice.selectors;
