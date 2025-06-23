// frontend/src/components/common/Spinner.js

import React from 'react';

const Spinner = () => {
  return (
    <div style={styles.spinnerOverlay}>
      <div style={styles.spinnerContainer}></div>
    </div>
  );
};

const styles = {
  spinnerOverlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  spinnerContainer: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3', /* Light grey */
    borderTop: '5px solid #3498db', /* Blue */
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  // Keyframes need to be defined in a CSS file or using a CSS-in-JS library.
  // For simplicity, we'll add it to index.css
};

export default Spinner;