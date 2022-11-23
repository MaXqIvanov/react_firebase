import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';
import { userState } from '../ts/type';
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth, provider } from '../firebase';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const UserAuth = createAsyncThunk(
    'auth/UserAuth',
    async (params: any, { getState }: any) => {
        const response = await signInWithPopup(auth, provider)
        return {response, params}
    }
);
export const UserLogout = createAsyncThunk(
    'auth/UserLogout',
    async (params: any, { getState }: any) => {
        const response = await signOut(auth)
        console.log(response);
        
        return {response, params}
    }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // loading
    loading: false,
    user: {},
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(UserAuth.pending, (state: userState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(UserAuth.fulfilled, (state: userState, { payload }: PayloadAction<any>) => {
        console.log(payload.response);
        
      if(payload.response.user.email){
        const credential: any = GoogleAuthProvider.credentialFromResult(payload.response);
        const token = credential.accessToken;
        const user = payload.response.user;
        Cookies.set('token', token, {expires: 90})
        Cookies.set('user', JSON.stringify(user), {expires: 90})
        payload.params.navigate('/')
      }
      state.loading = false;
    });
    builder.addCase(UserAuth.rejected, (state: userState) => {
      state.loading = false;
    });
    // UserLogout
    builder.addCase(UserLogout.pending, (state: userState, action: PayloadAction) => {
        state.loading = true;
      });
      builder.addCase(UserLogout.fulfilled, (state: userState, { payload }: PayloadAction<any>) => {
        Cookies.remove('token')
        Cookies.remove('user')
        payload.params.navigate('/auth')
        state.loading = false;
      });
      builder.addCase(UserLogout.rejected, (state: userState) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
export const {
} = authSlice.actions;