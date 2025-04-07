import {
  addIngredient,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown
} from './constructorslice';
import constructorSliceReducer from './constructorslice';
import { expect, it, describe } from '@jest/globals';
import { TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn().mockImplementation(() => 'mock-uuid')
}));

const initialState = {
  bun: null,
  ingredients: [],
  ingredientCounts: {}
};

const mockBun: TConstructorIngredient = {
  id: uuidv4(),
  _id: '1',
  name: 'булка',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 7,
  calories: 100,
  price: 100,
  image: '',
  image_large: '',
  image_mobile: ''
};

const mockIngredientMain = {
  id: uuidv4(),
  _id: '1',
  name: 'котлета',
  type: 'main',
  proteins: 100,
  fat: 50,
  carbohydrates: 14,
  calories: 300,
  price: 400,
  image: '',
  image_large: '',
  image_mobile: ''
};

const mockIngredientSaus = {
  id: uuidv4(),
  _id: '2',
  name: 'соус',
  type: 'saus',
  proteins: 10,
  fat: 100,
  carbohydrates: 20,
  calories: 200,
  price: 50,
  image: '',
  image_large: '',
  image_mobile: ''
};

describe('constructorSlice', () => {
  it('initialstate', () => {
    const state = constructorSliceReducer(initialState, addIngredient(mockBun));
    expect(state.bun).toEqual(mockBun);
  });

  it('addIngridient', () => {
    const state = constructorSliceReducer(
      initialState,
      addIngredient(mockIngredientMain)
    );
    expect(state.ingredients).toContainEqual(mockIngredientMain);
  });

  it('deleteIngredient', () => {
    const initialState = {
      bun: null,
      ingredients: [mockIngredientMain, mockIngredientSaus],
      ingredientCounts: { '1': 1, '2': 1 }
    };
    const state = constructorSliceReducer(
      initialState,
      deleteIngredient(initialState.ingredients[0].id)
    );
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredientCounts).toEqual({ '2': 1 });
  });

  it('move ingredient up and down', () => {
    const initialState = {
      bun: null,
      ingredients: [mockIngredientMain, mockIngredientSaus],
      ingredientCounts: { '1': 1, '2': 1 }
    };

    const newStateDown = constructorSliceReducer(
      initialState,
      moveIngredientDown(initialState.ingredients[0].id)
    );
    expect(newStateDown.ingredients[0]._id).toEqual('2');

    const newStateUp = constructorSliceReducer(
      initialState,
      moveIngredientUp(initialState.ingredients[0].id)
    );

    expect(newStateUp.ingredients[0]._id).toEqual('1');
  });
});
