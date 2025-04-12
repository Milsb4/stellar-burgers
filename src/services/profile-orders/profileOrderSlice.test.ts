import { configureStore } from '@reduxjs/toolkit';
import { expect, it, describe } from '@jest/globals';
import {
  profileOrderSliceReducer,
  IProfileOrderState
} from './profileOrderSlice';
import { getProfileOrder } from './action';
import { getOrdersApi } from '../../utils/burger-api';

jest.mock('../../utils/burger-api');

describe('profileOrderSlice', () => {
  let store: ReturnType<typeof configureStore<RootState>>;
  type RootState = {
    orders: IProfileOrderState;
  };

  beforeEach(() => {
    store = configureStore({ reducer: { orders: profileOrderSliceReducer } });
  });
  it('getProfileOrder.pending', () => {
    store.dispatch(getProfileOrder.pending(''));

    const state = store.getState().orders;
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('getProfileOrder.fulfilled', async () => {
    const mockPayload = {
      orders: [
        { id: 1, name: 'санчуальский бургер' },
        { id: 2, name: 'бургер космический' }
      ]
    };
    (getOrdersApi as jest.Mock).mockResolvedValueOnce(mockPayload);
    await store.dispatch(getProfileOrder());

    const state = store.getState().orders;
    expect(state.orders).toEqual(mockPayload);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });
  it('getProfileOrder.rejected', async () => {
    (getOrdersApi as jest.Mock).mockRejectedValueOnce(
      new Error('fetch failed')
    );
    await store.dispatch(getProfileOrder());

    const state = store.getState().orders;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('fetch failed');
  });
});
