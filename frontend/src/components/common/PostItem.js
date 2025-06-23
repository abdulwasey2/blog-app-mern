// frontend/src/components/common/PostItem.js

import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate'; // 1. Import karein

const PostItem = ({ post }) => {
  // Create a snippet from the content
  const createSnippet = (htmlContent) => {
    const div = document.createElement('div');
    div.innerHTML = htmlContent;
    const text = div.textContent || div.innerText || '';
    return text.substring(0, 150) + '...';
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}><Link to={`/post/${post.slug}`} style={styles.link}>{post.title}</Link></h2>
      <p style={styles.meta}>
        {/* 2. formatDate ka istemal karein */}
        By {post.author.name} on {formatDate(post.createdAt)}
      </p>
      <p style={styles.snippet}>{createSnippet(post.content)}</p>
      <Link to={`/post/${post.slug}`} style={styles.readMore}>Read More &rarr;</Link>
    </div>
  );
};

// ... styles object waisa hi rahega ...
const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
  },
  title: {
    margin: '0 0 0.5rem 0',
  },
  link: {
    textDecoration: 'none',
    color: '#2c3e50',
  },
  meta: {
    fontSize: '0.9rem',
    color: '#7f8c8d',
    marginBottom: '1rem',
  },
  snippet: {
    color: '#34495e',
    lineHeight: '1.6',
  },
  readMore: {
    display: 'inline-block',
    marginTop: '1rem',
    textDecoration: 'none',
    color: '#3498db',
    fontWeight: 'bold',
  }
};


export default PostItem;