import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingredient/get',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);
