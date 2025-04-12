import { expect, it, describe } from '@jest/globals';
import { rootReducer } from './store';
import { ingredientsSlice } from '../services/ingredients/ingredientSlice';
import { constructorSlice } from '../services/burger-constructor/constructorslice';
import { feedSlice } from '../services/feed/feedSlice';
import { userSlice } from '../services/user/userSlice';
import { orderSlice } from '../services/Order/OrderSlice';
import { profileOrderSlice } from '../services/profile-orders/profileOrderSlice';

describe('тестируем rootReducer', () => {
  it('rootReducer default', () => {
    const initialState = rootReducer(undefined, { type: '@@INTT' });

    expect(initialState).toEqual({
      ingredients: ingredientsSlice.getInitialState(),
      burgerConstructor: constructorSlice.getInitialState(),
      orderData: orderSlice.getInitialState(),
      feed: feedSlice.getInitialState(),
      user: userSlice.getInitialState(),
      profileOrder: profileOrderSlice.getInitialState()
    });
  });
});
