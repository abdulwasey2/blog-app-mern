// frontend/src/components/comments/AddCommentForm.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../features/comments/commentSlice';
import { toast } from 'react-toastify';

const AddCommentForm = ({ postSlug }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error('Comment cannot be empty.');
      return;
    }
    dispatch(addComment({ slug: postSlug, text }))
      .unwrap()
      .then(() => {
        setText(''); // Clear the textarea on success
        toast.success('Comment added!');
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div style={styles.container}>
      <h4>Leave a Comment</h4>
      <form onSubmit={handleSubmit}>
        <textarea
          style={styles.textarea}
          rows="4"
          placeholder="Write your comment here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <button type="submit" style={styles.button}>
          Submit Comment
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box', // Ensures padding doesn't affect width
    marginBottom: '1rem',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    background: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default AddCommentForm;