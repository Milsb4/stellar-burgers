import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

export interface IBurgerConstructor {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  ingredientCounts: { [id: string]: number };
}

export const initialState: IBurgerConstructor = {
  bun: null,
  ingredients: [],
  ingredientCounts: {}
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
          state.ingredientCounts[action.payload._id] =
            (state.ingredientCounts[action.payload._id] || 0) + 1;
        }
      },
      prepare(ingredient: TIngredient) {
        return { payload: { ...ingredient, id: uuidv4() } };
      }
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      const idToDelete = action.payload;
      // Удаляем ингредиент из массива ingredients
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== idToDelete
      );
      // Уменьшаем счетчик
      if (state.ingredientCounts[idToDelete]) {
        state.ingredientCounts[idToDelete] -= 1;
        if (state.ingredientCounts[idToDelete] <= 0) {
          delete state.ingredientCounts[idToDelete];
        }
      }
    },
    moveIngredientUp: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload
      );
      if (index > 0) {
        const ingredientToMove = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index - 1, 0, ingredientToMove);
      }
    },
    moveIngredientDown: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload
      );
      if (index < state.ingredients.length - 1) {
        const ingredientToMove = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index + 1, 0, ingredientToMove);
      }
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    selectConstructorItems: (state: IBurgerConstructor) => state
  }
});

export const {
  addIngredient,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = constructorSlice.actions;

export const { selectConstructorItems } = constructorSlice.selectors;
