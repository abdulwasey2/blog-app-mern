// frontend/src/routes/AppRoutes.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CreatePostPage from '../pages/CreatePostPage';
import PostDetailPage from '../pages/PostDetailPage';
import EditPostPage from '../pages/EditPostPage';
import PrivateRoute from './PrivateRoute';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', flex: 1, width: '100%' }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:slug" element={<PostDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* ❗ NEW: Routes for Search and Pagination */}
            <Route path="/search/:keyword" element={<HomePage />} />
            <Route path="/page/:pageNumber" element={<HomePage />} />
            <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} />

            {/* Private Routes */}
            <Route path="" element={<PrivateRoute />}>
              <Route path="/create-post" element={<CreatePostPage />} />
              <Route path="/edit-post/:slug" element={<EditPostPage />} />
            </Route>

            {/* Not Found Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;