import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getProfileOrder = createAsyncThunk(
  'profileOrder/getOrders',
  getOrdersApi
);
