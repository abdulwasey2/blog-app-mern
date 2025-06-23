// frontend/src/pages/HomePage.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom'; // 1. Link aur useParams ko import karein
import { getPosts } from '../features/posts/postSlice';
import PostItem from '../components/common/PostItem';
import Spinner from '../components/common/Spinner';
import Paginate from '../components/common/Paginate'; // 2. Paginate ko import karein
import { toast } from 'react-toastify';

const HomePage = () => {
  const dispatch = useDispatch();
  const { keyword, pageNumber } = useParams(); // 3. URL se params hasil karein

  const { posts, loading, error, page, pages } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    // 4. Params ke sath getPosts ko dispatch karein
    dispatch(getPosts({ keyword, pageNumber: pageNumber || 1 }));
    if (error) {
      toast.error(error);
    }
  }, [dispatch, error, keyword, pageNumber]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {keyword && (
        <Link to="/" style={styles.goBack}>
          &larr; Go Back
        </Link>
      )}
      <h1 style={{ marginBottom: '2rem' }}>
        {keyword ? `Search Results for "${keyword}"` : 'Latest Posts'}
      </h1>
      
      {posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
          {/* 5. Paginate component ko render karein */}
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </>
      ) : (
        <p>No posts found. {keyword && 'Try a different search term.'}</p>
      )}
    </div>
  );
};

const styles = {
  goBack: {
    display: 'inline-block',
    marginBottom: '1rem',
    textDecoration: 'none',
    color: '#3498db',
    fontWeight: 'bold',
  },
};

export default HomePage;