// frontend/src/components/layout/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p>&copy; {new Date().getFullYear()} MERN Blog. All Rights Reserved.</p>
        <p>Created with ❤️ using the MERN Stack</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    textAlign: 'center',
    padding: '2rem 0',
    marginTop: '3rem',
  },
  container: {
    width: '90%',
    margin: '0 auto',
  }
};

export default Footer;