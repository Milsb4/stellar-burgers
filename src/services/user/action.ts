import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

//Данные о пользователе
export const getUser = createAsyncThunk('user/getuser', async () => {
  const data = await getUserApi();
  return data;
});

//Аутентификация пользователя
export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

//Обновление данных пользователя
export const upDateUser = createAsyncThunk<TUserResponse, TRegisterData>(
  'user/update',
  async (body) => {
    const data = await updateUserApi(body);
    return data;
  }
);
