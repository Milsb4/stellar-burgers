import { expect, it, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { fetchNewOrder, fetchOrder, getOrderByNumber } from './actions';
import { orderReducer, IOrderState } from './OrderSlice';
import {
  getOrderByNumberApi,
  orderBurgerApi,
  getOrdersApi
} from '../../utils/burger-api';

jest.mock('../../utils/burger-api');

describe('OrderSlice', () => {
  let store: ReturnType<typeof configureStore<RootState>>;
  type RootState = {
    order: IOrderState;
  };

  beforeEach(() => {
    store = configureStore({ reducer: { order: orderReducer } });
  });

  //тесты fetchNewOrder

  it('fetchNewOrder.pending', () => {
    store.dispatch(fetchNewOrder.pending(''));

    const state = store.getState().order;
    expect(state.orderRequest).toBe(true);
  });

  it('fetchNewOrder.fulfilled', async () => {
    const mockPayload = {
      orderData: [{ id: 1, name: 'санчуальский бургер' }]
    };

    (orderBurgerApi as jest.Mock).mockResolvedValueOnce(mockPayload);
    await store.dispatch(fetchNewOrder());

    const state = store.getState().order;
    expect(state.orderData).toEqual(mockPayload.order);
    expect(state.orderRequest).toBe(false);
  });

  it('fetchNewOrder.rejected', async () => {
    (orderBurgerApi as jest.Mock).mockRejectedValueOnce(
      new Error('fetch failed')
    );
    await store.dispatch(fetchNewOrder());

    const state = store.getState().order;
    expect(state.orderRequest).toBe(false);
  });

  //тесты fetchOrder

  it('fetchOrder.pending', () => {
    store.dispatch(fetchOrder.pending(''));

    const state = store.getState().order;
    expect(state.orderRequest).toBe(true);
  });

  it('fetchOrder.fulfilled', async () => {
    const mockPayload = {
      orders: [
        { id: 1, name: 'санчуальский бургер' },
        { id: 2, name: 'бургер космический' }
      ]
    };

    (getOrdersApi as jest.Mock).mockResolvedValueOnce(mockPayload);
    await store.dispatch(fetchOrder());

    const state = store.getState().order;
    expect(state.orders).toEqual(mockPayload);
    expect(state.orderRequest).toBe(false);
  });

  it('fetchOrder.rejected', async () => {
    (getOrdersApi as jest.Mock).mockRejectedValueOnce(
      new Error('fetch failed')
    );
    await store.dispatch(fetchOrder());

    const state = store.getState().order;
    expect(state.orderRequest).toBe(false);
  });

  //тесты getOrderByNumber

  it('getOrderByNumber.pending', () => {
    store.dispatch(fetchOrder.pending(''));

    const state = store.getState().order;
    expect(state.orderRequest).toBe(true);
  });

  it('getOrderByNumber.fulfilled', async () => {
    const mockPayload = {
      orders: [
        { id: 1, name: 'санчуальский бургер' },
        { id: 2, name: 'бургер космический' }
      ]
    };

    (getOrderByNumberApi as jest.Mock).mockResolvedValueOnce(mockPayload);
    await store.dispatch(getOrderByNumber());

    const state = store.getState().order;
    expect(state.selectedOrder).toEqual(mockPayload.orders[0]);
    expect(state.orderRequest).toBe(false);
  });

  it('getOrderByNumber.rejected', async () => {
    (getOrderByNumberApi as jest.Mock).mockRejectedValueOnce(
      new Error('fetch failed')
    );
    await store.dispatch(getOrderByNumber());

    const state = store.getState().order;
    expect(state.orderRequest).toBe(false);
  });
});
