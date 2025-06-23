// frontend/src/features/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import postReducer from './posts/postSlice';
import commentReducer from './comments/commentSlice'; // 1. Import comment reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    comments: commentReducer, // 2. Add comment reducer to the store
  },
});