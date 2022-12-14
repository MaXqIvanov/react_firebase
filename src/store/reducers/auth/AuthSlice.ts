import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { userState } from '../../../ts/type';
import { UserAuth, UserLogout } from './ActionAuth';
import { GoogleAuthProvider } from 'firebase/auth';
import { NavigateFunction } from 'react-router-dom';

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    // loading
    loading: false,
    user: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(UserAuth.pending, (state: userState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      UserAuth.fulfilled,
      (
        state: userState,
        { payload }: PayloadAction<{ response: any; params: { navigate: NavigateFunction } }>
      ) => {
        if (payload.response.user.email) {
          const credential: any = GoogleAuthProvider.credentialFromResult(payload.response);
          const token = credential.accessToken;
          const user = payload.response.user;
          Cookies.set('token', token, { expires: 90 });
          Cookies.set('user', JSON.stringify(user), { expires: 90 });
          payload.params.navigate('/');
        }
        state.loading = false;
      }
    );
    builder.addCase(UserAuth.rejected, (state: userState) => {
      state.loading = false;
    });
    // UserLogout
    builder.addCase(UserLogout.pending, (state: userState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      UserLogout.fulfilled,
      (
        state: userState,
        { payload }: PayloadAction<{ response: any; params: { navigate: NavigateFunction } }>
      ) => {
        Cookies.remove('token');
        Cookies.remove('user');
        payload.params.navigate('/auth');
        state.loading = false;
      }
    );
    builder.addCase(UserLogout.rejected, (state: userState) => {
      state.loading = false;
    });
  },
});

export default AuthSlice.reducer;
export const {} = AuthSlice.actions;
