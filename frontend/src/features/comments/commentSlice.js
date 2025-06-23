// frontend/src/features/comments/commentSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

// Async thunk to fetch comments for a specific post
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/posts/${slug}/comments`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error || 'Could not fetch comments.');
    }
  }
);

// Async thunk to add a new comment
export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ slug, text }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/posts/${slug}/comments`, { text });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error || 'Could not add comment.');
    }
  }
);

// Async thunk to delete a comment
export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
      return commentId; // Return the ID of the deleted comment
    } catch (error) {
      return rejectWithValue(error.response.data.error || 'Could not delete comment.');
    }
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    resetCommentState: (state) => {
      state.comments = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch comments cases
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.comments = payload;
      })
      .addCase(fetchComments.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Add comment cases
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.loading = false;
        // Add the new comment to the top of the list
        state.comments.unshift(payload);
        state.error = null;
      })
      .addCase(addComment.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Delete comment cases
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, { payload: commentId }) => {
        state.loading = false;
        // Remove the deleted comment from the state
        state.comments = state.comments.filter((c) => c._id !== commentId);
        state.error = null;
      })
      .addCase(deleteComment.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { resetCommentState } = commentSlice.actions;
export default commentSlice.reducer;