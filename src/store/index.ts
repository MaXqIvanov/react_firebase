import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import todoSlice from './todoSlice';

const rootReducer = combineReducers({
  todo: todoSlice,
  auth: authSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];