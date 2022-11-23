import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthSlice from './reducers/auth/AuthSlice';
import TodoSlice from './reducers/todo/TodoSlice';

const rootReducer = combineReducers({
  todo: TodoSlice,
  auth: AuthSlice,
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