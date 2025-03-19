import { getOrderByNumberApi, orderBurgerApi, getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearConstructor } from '../burger-constructor/constructorslice';

export const fetchNewOrder = createAsyncThunk(
  'orders/newOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const fetchOrder = createAsyncThunk(
  'orders/fetchOrders',
  async () => await getOrdersApi() // Выполняем API запрос
);

export const getOrderByNumber = createAsyncThunk(
  'orders/fetchOrderByNumber',
  async (orderNumber: number) =>
    // Здесь твой API запрос для получения заказа по номеру
    await getOrderByNumberApi(orderNumber)
);
