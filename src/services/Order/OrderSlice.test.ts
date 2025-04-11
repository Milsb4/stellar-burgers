import { orderReducer, initialState } from './OrderSlice';
import { fetchNewOrder, fetchOrder, getOrderByNumber } from './actions';

describe('orderSlice', () => {
  const ordersMock = [
    {
      _id: 'order1',
      name: 'Order 1',
      status: 'done',
      ingredients: ['ingredient1', 'ingredient2'],
      price: 300
    },
    {
      _id: 'order2',
      name: 'Order 2',
      status: 'in-progress',
      ingredients: ['ingredient3', 'ingredient4'],
      price: 400
    }
  ];

  const orderMock = {
    _id: 'order1',
    name: 'Order 1',
    status: 'done',
    ingredients: ['ingredient1', 'ingredient2'],
    price: 300
  };

  it('initialState', () => {
    const state = orderReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  it('fetchOrder.pending', () => {
    const action = { type: fetchOrder.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.orders).toEqual([]);
  });

  it(' fetchOrder.fulfilled', () => {
    const action = {
      type: fetchOrder.fulfilled.type,
      payload: ordersMock
    };

    const state = orderReducer(initialState, action);
    expect(state.orders).toEqual(ordersMock);
    expect(state.orderRequest).toBe(false);
  });

  it('fetchOrder.rejected', () => {
    const action = {
      type: fetchOrder.rejected.type,
      error: { message: 'fetch failed' }
    };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orders).toEqual([]);
  });

  it('getOrderByNumber.pending', () => {
    const action = { type: getOrderByNumber.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.selectedOrder).toBeNull();
  });

  it('getOrderByNumber.fulfilled', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [orderMock] }
    };

    const state = orderReducer(initialState, action);
    expect(state.selectedOrder).toEqual(orderMock);
    expect(state.orderRequest).toBe(false);
  });

  it('getOrderByNumber.rejected', () => {
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: 'fetch failed' }
    };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.selectedOrder).toBeNull();
  });

  it('fetchNewOrder.pending', () => {
    const action = { type: fetchNewOrder.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(true);
  });

  it('fetchNewOrder.fulfilled', () => {
    const action = {
      type: fetchNewOrder.fulfilled.type,
      payload: { order: orderMock }
    };

    const state = orderReducer(initialState, action);
    expect(state.orderData).toEqual(orderMock);
    expect(state.orderRequest).toBe(false);
  });

  it('fetchNewOrder.rejected', () => {
    const action = {
      type: fetchNewOrder.rejected.type,
      error: { message: 'fetch failed' }
    };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderData).toBeNull();
  });
});
