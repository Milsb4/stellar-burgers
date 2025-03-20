import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import { ingredientsSlice } from '../ingredients/ingredientSlice';

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
          if (state.bun) {
            state.ingredientCounts[state.bun._id] -= 2;

            // Удаляем счетчик, если он стал равен 0
            if (state.ingredientCounts[state.bun._id] <= 0) {
              delete state.ingredientCounts[state.bun._id];
            }
          }

          // Устанавливаем новую булку
          state.bun = action.payload;
          state.ingredientCounts[action.payload._id] =
            (state.ingredientCounts[action.payload._id] || 0) + 2;
        } else {
          state.ingredients.push(action.payload);
          // Увеличиваем счетчик для ингредиента
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
      const indexToDelete = state.ingredients.findIndex(
        (ingredient) => ingredient.id === idToDelete
      );

      if (indexToDelete !== -1) {
        const ingredientToDelete = state.ingredients[indexToDelete];
        state.ingredients.splice(indexToDelete, 1); // Удаляем ингредиент

        // Уменьшаем счетчик
        if (state.ingredientCounts[ingredientToDelete._id]) {
          state.ingredientCounts[ingredientToDelete._id] -= 1;

          // Удаляем счетчик, если он стал равен 0
          if (state.ingredientCounts[ingredientToDelete._id] <= 0) {
            delete state.ingredientCounts[ingredientToDelete._id];
          }
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
      state.ingredientCounts = {}; // Очищаем счетчики
    }
  },
  selectors: {
    selectConstructorItems: (state: IBurgerConstructor) => ({
      bun: state.bun,
      ingredients: state.ingredients,
      ingredientCounts: Object.fromEntries(
        Object.entries(state.ingredientCounts).filter(([_, count]) => count > 0)
      )
    })
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
