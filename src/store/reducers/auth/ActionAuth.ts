import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, provider } from '../../../firebase';

/**
 * function for user authorization width google firebase
 */
export const UserAuth = createAsyncThunk(
  'auth/UserAuth',
  async (params: any, { getState }: any) => {
    const response = await signInWithPopup(auth, provider);
    return { response, params };
  }
);
/**
 * function for user logout width google firebase
 */
export const UserLogout = createAsyncThunk(
  'auth/UserLogout',
  async (params: any, { getState }: any) => {
    const response = await signOut(auth);
    console.log(response);

    return { response, params };
  }
);
