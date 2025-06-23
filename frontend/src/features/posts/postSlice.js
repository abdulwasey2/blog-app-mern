// frontend/src/features/posts/postSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: null,
  pages: 1,
  page: 1,
};

// Async thunk to GET all posts
// ❗ CHANGE: Ab yeh object accept karega { keyword, pageNumber }
export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async ({ keyword = '', pageNumber = '' }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/posts?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error || 'Could not fetch posts');
    }
  }
);

// ... baaqi async thunks (getPostBySlug, createPost, etc.) wese hi rahenge ...
// Async thunk to GET a single post by slug
export const getPostBySlug = createAsyncThunk(
  'posts/getPostBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/posts/${slug}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error || 'Post not found');
    }
  }
);

// Async thunk to CREATE a new post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/posts', postData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error || 'Could not create post');
    }
  }
);

// Async thunk to UPDATE a post
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ slug, postData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/posts/${slug}`, postData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error || 'Could not update the post');
    }
  }
);

// Async thunk to DELETE a post
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (slug, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/posts/${slug}`);
      return slug; // Return slug on success to identify which post to remove from state
    } catch (error) {
      return rejectWithValue(error.response.data.error || 'Could not delete the post');
    }
  }
);


const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPostState: (state) => {
      state.post = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all posts
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.posts = payload.posts;
        state.page = payload.page;
        state.pages = payload.pages;
      })
      .addCase(getPosts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // ... baaqi reducers wese hi rahenge ...
      // Get single post by slug
      .addCase(getPostBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostBySlug.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.post = payload;
      })
      .addCase(getPostBySlug.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Create a new post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.posts.unshift(payload); // Add new post to the beginning of the array
        state.post = payload; // Set the current post
      })
      .addCase(createPost.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Update a post
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.post = payload; // Update the single post view
        const index = state.posts.findIndex((p) => p._id === payload._id);
        if (index !== -1) {
          state.posts[index] = payload;
        }
      })
      .addCase(updatePost.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Delete a post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, { payload: slug }) => {
        state.loading = false;
        state.posts = state.posts.filter((p) => p.slug !== slug);
        state.post = null;
      })
      .addCase(deletePost.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { resetPostState } = postSlice.actions;
export default postSlice.reducer;