// frontend/src/features/comments/CommentList.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment } from './commentSlice'; // Path is correct as it's a sibling
import { toast } from 'react-toastify';

// ❗ ERROR FIX: Spinner component ka import path durust kar diya gaya hai.
// Yeh ab ../common/Spinner ke bajaye ../../components/common/Spinner hai.
import Spinner from '../../components/common/Spinner';

const CommentList = () => {
  const dispatch = useDispatch();
  const { comments, loading } = useSelector((state) => state.comments);
  const { userInfo } = useSelector((state) => state.auth);

  const handleDelete = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      dispatch(deleteComment(commentId))
        .unwrap()
        .then(() => toast.success('Comment deleted.'))
        .catch((error) => toast.error(error));
    }
  };

  if (loading) return <Spinner />;

  return (
    <div style={styles.container}>
      <h3>Comments ({comments.length})</h3>
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} style={styles.comment}>
            <div style={styles.commentHeader}>
              <strong>{comment.author.name}</strong>
              <span style={styles.date}>
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
            <p style={styles.text}>{comment.text}</p>
            {userInfo && userInfo._id === comment.author._id && (
              <button
                onClick={() => handleDelete(comment._id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: '2.5rem',
  },
  comment: {
    border: '1px solid #eee',
    padding: '1rem',
    borderRadius: '5px',
    marginBottom: '1rem',
    backgroundColor: '#fff',
  },
  commentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
    color: '#555',
  },
  date: {
    fontSize: '0.85rem',
    color: '#7f8c8d',
  },
  text: {
    lineHeight: '1.6',
    color: '#34495e',
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    color: '#e74c3c',
    cursor: 'pointer',
    fontSize: '0.9rem',
    padding: '0.2rem 0.5rem',
  },
};

export default CommentList;