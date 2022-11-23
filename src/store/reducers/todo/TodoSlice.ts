import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';
import { todoState } from '../../../ts/type';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const getTaskDay = createAsyncThunk(
  'todo/getTaskDay',
  async (params: any, { getState }: any) => {
    console.log(params);
    // return { response };
  }
);
const TodoSlice = createSlice({
  name: 'todo',
  initialState: {
    // loading
    loading: false,
  },
  reducers: {
    setCurrentVariantTable(state: todoState, action: any) {
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTaskDay.pending, (state: todoState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(getTaskDay.fulfilled, (state: todoState, { payload }: PayloadAction<any>) => {
      console.log(payload);
      state.loading = false;
    });
    builder.addCase(getTaskDay.rejected, (state: todoState) => {
      state.loading = false;
    });
  },
});

export default TodoSlice.reducer;
export const {
  setCurrentVariantTable,
} = TodoSlice.actions;