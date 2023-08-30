import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice/dataSlice';
import filtredReducer from './filtersSlice/filtersSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    filtred: filtredReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
