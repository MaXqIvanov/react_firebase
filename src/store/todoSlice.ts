import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';
import { todoState } from '../ts/type';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const getTaskDay = createAsyncThunk(
  'task/getTaskDay',
  async (params: any, { getState }: any) => {
    console.log(params);
    // return { response };
  }
);
const taskSlice = createSlice({
  name: 'task',
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

export default taskSlice.reducer;
export const {
  setCurrentVariantTable,
} = taskSlice.actions;