import { expect, it, describe } from '@jest/globals';
import { ingredientReducer, IngredientState } from './ingredientSlice';
import { configureStore } from '@reduxjs/toolkit';
import { getIngredients } from './actions';
import { getIngredientsApi } from '../../utils/burger-api';

jest.mock('../../utils/burger-api');

describe('IngredientSlice', () => {
  let store: ReturnType<typeof configureStore<RootState>>;
  type RootState = {
    ingridients: IngredientState;
  };

  beforeEach(() => {
    store = configureStore({ reducer: { ingridients: ingredientReducer } });
  });
  it('getIngredients.pending', () => {
    store.dispatch(getIngredients.pending(''));

    const state = store.getState().ingridients;
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('getIngredients.fulfilled', async () => {
    const mockIngredients = {
      ingredients: [
        { id: 1, name: 'котлета марсианская' },
        { id: 2, name: 'соус по-альлатски' }
      ]
    };

    (getIngredientsApi as jest.Mock).mockResolvedValueOnce(mockIngredients);
    await store.dispatch(getIngredients());

    const state = store.getState().ingridients;
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('getIngredients.rejected', async () => {
    (getIngredientsApi as jest.Mock).mockRejectedValueOnce(
      new Error('fetch failed')
    );
    await store.dispatch(getIngredients());

    const state = store.getState().ingridients;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('fetch failed');
  });
});
