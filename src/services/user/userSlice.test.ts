import { expect, it, describe } from '@jest/globals';
import { initialState, userSliceReducer } from './userSlice';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  upDateUser
} from './action';

describe('userSlice', () => {
  it('должен вернуться initialstate', () => {
    expect(userSliceReducer(undefined, { type: '' })).toEqual(initialState);
  });
});

//registerUser

describe('registerUser', () => {
  it('registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userSliceReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Failed to register' }
    };
    const state = userSliceReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Failed to register');
  });

  it('registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: { name: 'TestUser', email: 'test@mail.ru' } }
    };
    const state = userSliceReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.user).toEqual(action.payload.user);
    expect(state.isAuthorized).toBe(true);
  });
});

//getUser

describe('getUser', () => {
  it('getUser.pending', () => {
    const action = { type: getUser.pending.type };
    const state = userSliceReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('getUser.rejected', () => {
    const action = {
      type: getUser.rejected.type,
      error: { message: 'Failed to get user' }
    };
    const state = userSliceReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Failed to get user');
  });

  it('getUser.fulfilled', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: { user: { name: 'TestUser', email: 'test@mail.ru' } }
    };
    const state = userSliceReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.user).toEqual(action.payload.user);
    expect(state.isAuthorized).toBe(true);
  });
});

//loginUser

describe('loginUser', () => {
  it('loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userSliceReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('loginUser.rejected', () => {
    const action = {
      type: getUser.rejected.type,
      error: { message: 'Failed to login user' }
    };
    const state = userSliceReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Failed to login user');
  });

  it('loginUser.fulfilled', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: { user: { name: 'TestUser', email: 'test@mail.ru' } }
    };
    const state = userSliceReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.user).toEqual(action.payload.user);
    expect(state.isAuthorized).toBe(true);
  });
});

//logoutUser

describe('logoutUser', () => {
  it('should handle logoutUser.fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const stateWithUser = {
      ...initialState,
      user: { name: 'TestUser', email: 'alice@test.ru' },
      isAuthorized: true
    };
    const state = userSliceReducer(stateWithUser, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.user).toBe(null);
    expect(state.isAuthorized).toBe(false);
  });

  it('loginUser.rejected', () => {
    const action = {
      type: logoutUser.rejected.type,
      error: { message: 'Failed to logout user' }
    };
    const state = userSliceReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Failed to logout user');
  });

  //upDateUser

  describe('upDateUser', () => {
    it('upDateUser.rejected', () => {
      const action = {
        type: upDateUser.rejected.type,
        error: { message: 'Failed to update user' }
      };
      const state = userSliceReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Failed to update user');
    });

    it('upDateUser.fulfilled', () => {
      const action = {
        type: upDateUser.fulfilled.type,
        payload: { user: { name: 'TestUser', email: 'test@mail.ru' } }
      };
      const state = userSliceReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.user).toEqual(action.payload.user);
      expect(state.isAuthorized).toBe(true);
    });
  });
});
