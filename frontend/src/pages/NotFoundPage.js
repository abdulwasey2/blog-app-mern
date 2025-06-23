// frontend/src/pages/NotFoundPage.js

import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Oops! The page you are looking for does not exist.</p>
      <p style={styles.message}>It might have been moved or deleted.</p>
      <Link to="/" style={styles.link}>
        Go Back to Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '5rem',
  },
  title: {
    fontSize: '6rem',
    fontWeight: 'bold',
    color: '#34495e',
    margin: 0,
  },
  message: {
    fontSize: '1.2rem',
    color: '#7f8c8d',
  },
  link: {
    display: 'inline-block',
    marginTop: '2rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3498db',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
};

export default NotFoundPage;