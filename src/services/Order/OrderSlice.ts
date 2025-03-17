import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchOrder, getOrderByNumber } from './actions';

export interface IOrderState {
  orderData: TOrder | null;
  orderRequest: boolean;
}

export const initialState: IOrderState = {
  orderData: null,
  orderRequest: false
};

export const orderSlice = createSlice({
  name: 'orderData',
  initialState,
  reducers: {
    clearOrderModalData(state) {
      state.orderData = null;
    }
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderData
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderData = action.payload;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
        state.orderRequest = false;
        state.orderData = payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const { clearOrderModalData } = orderSlice.actions;
export const { getOrderRequest, getOrderModalData } = orderSlice.selectors;
