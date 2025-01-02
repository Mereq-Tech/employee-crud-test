import { configureStore } from '@reduxjs/toolkit';
import { employeeApi } from './employeeSlice';

const store = configureStore({
  reducer: {
    [employeeApi.reducerPath]: employeeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;