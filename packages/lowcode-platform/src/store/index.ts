import { configureStore } from '@reduxjs/toolkit';
import layoutReducers from './layoutStore';
import dragReducers from './dragStore';

const store = configureStore({
  reducer: {
    layout: layoutReducers,
    drag: dragReducers
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;