import { loginRequest, loginResponse } from '@eagles/definitions';
import { setToken } from '../redux/auth/slice';
import { store } from '../redux/store';
import { servicesInstance } from '../utils/axios';

export const login = async (request: loginRequest): Promise<void> => {
  try {
    const { data } = await servicesInstance.post<loginResponse>(
      'auth/login',
      request
    );

    localStorage.setItem('token', data.token);

    store.dispatch(setToken(data.token));
  } catch (error: unknown) {
    console.error(error);
  }
};
