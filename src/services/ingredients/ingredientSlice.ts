import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from './actions';

export interface IngredientState {
  isLoading: boolean;
  ingredients: TIngredient[];
  error: string | null;
}

export const initialState: IngredientState = {
  isLoading: false,
  ingredients: [],
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsError: (state) => state.error,
    getIngredientsLoadingState: (state) => state.isLoading,
    getIngredientsState: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  }
});

export const {
  getIngredientsError,
  getIngredientsLoadingState,
  getIngredientsState
} = ingredientsSlice.selectors;
