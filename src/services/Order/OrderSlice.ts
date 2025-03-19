import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchOrder, getOrderByNumber, fetchNewOrder } from './actions';

export interface IOrderState {
  orderData: TOrder | null;
  orderRequest: boolean;
  orders: TOrder[];
  selectedOrder: TOrder | null;
}

export const initialState: IOrderState = {
  orderData: null,
  orderRequest: false,
  orders: [],
  selectedOrder: null
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
    getOrderModalData: (state) => state.orderData,
    selectOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchNewOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchNewOrder.fulfilled, (state, action) => {
        state.orderData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orders = action.payload; // Заполняем список заказов
        state.orderRequest = false;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.selectedOrder = action.payload.orders[0];
        state.orderRequest = false;
      });
  }
});

export const { clearOrderModalData } = orderSlice.actions;
export const { getOrderRequest, getOrderModalData } = orderSlice.selectors;
