import { configureStore } from '@reduxjs/toolkit';
import { feedReducer, IFeedState} from './feedSlice';
import { getFeeds } from './action';
import { getFeedsApi } from '../../utils/burger-api';
import { expect, it, describe } from '@jest/globals';

jest.mock('../../utils/burger-api');

describe('feedSlice', () => {
  let store: ReturnType<typeof configureStore<RootState>>;
  type RootState = {
    feed: IFeedState;
  };

  beforeEach(() => {
    store = configureStore({ reducer: { feed: feedReducer } });
  });
  it('getFeeds.pending', () => {
    store.dispatch(getFeeds.pending(''));

    const state = store.getState().feed;
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('getFeeds.fulfilled', async () => {
    const mockPayload = {
      orders: [{ id: 1, name: 'order 1' }],
      total: 1000,
      totalToday: 10
    };

    (getFeedsApi as jest.Mock).mockResolvedValueOnce(mockPayload);
    await store.dispatch(getFeeds());

    const state = store.getState().feed;
    expect(state.orders).toEqual(mockPayload.orders);
    expect(state.total).toBe(mockPayload.total);
    expect(state.totalToday).toBe(mockPayload.totalToday);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('getFeeds.rejected', async () => {
    (getFeedsApi as jest.Mock).mockRejectedValueOnce(new Error('fetch failed'));
    await store.dispatch(getFeeds());

    const state = store.getState().feed;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('fetch failed');
  });
});
