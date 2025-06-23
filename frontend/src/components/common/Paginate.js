// frontend/src/components/common/Paginate.js

import React from 'react';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, keyword = '' }) => {
  if (pages <= 1) {
    return null; // Don't show pagination if there's only one page
  }

  return (
    <div style={styles.pagination}>
      {[...Array(pages).keys()].map((x) => (
        <Link
          key={x + 1}
          to={
            keyword
              ? `/search/${keyword}/page/${x + 1}`
              : `/page/${x + 1}`
          }
          style={page === x + 1 ? styles.activeLink : styles.link}
        >
          {x + 1}
        </Link>
      ))}
    </div>
  );
};

const styles = {
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem 0',
  },
  link: {
    margin: '0 5px',
    padding: '8px 12px',
    border: '1px solid #ddd',
    color: '#3498db',
    textDecoration: 'none',
    borderRadius: '4px',
  },
  activeLink: {
    margin: '0 5px',
    padding: '8px 12px',
    border: '1px solid #3498db',
    backgroundColor: '#3498db',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
  },
};

export default Paginate;