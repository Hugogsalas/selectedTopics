import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface AuthState {
  token: null | string;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
