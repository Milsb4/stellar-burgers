import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeeds = createAsyncThunk('feed/getfeeds', async () => {
  const respone = await getFeedsApi();
  return respone;
});
