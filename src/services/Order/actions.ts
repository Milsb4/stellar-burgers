import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearConstructor } from '../burger-constructor/constructorslice';

export const fetchOrder = createAsyncThunk(
  'orderData/createOrder',
  async (data: string[], { dispatch }) => {
    const response = await orderBurgerApi(data);
    if (response.success) {
      dispatch(clearConstructor());
    } else {
      throw new Error('Ошибка создания заказа');
    }
    return response.order;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  getOrderByNumberApi
);
