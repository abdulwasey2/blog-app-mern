// frontend/src/components/common/SearchBox.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
    setKeyword(''); // Clear input after search
  };

  return (
    <form onSubmit={submitHandler} style={styles.form}>
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search Posts..."
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Search
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
  },
  input: {
    padding: '0.5rem',
    borderRadius: '5px 0 0 5px',
    border: '1px solid #ccc',
    borderRight: 'none',
  },
  button: {
    padding: '0.5rem 1rem',
    background: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '0 5px 5px 0',
    cursor: 'pointer',
  },
};

export default SearchBox;