import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import moviesReducer from '../slices/moviesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
