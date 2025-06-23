// frontend/src/utils/formatDate.js

/**
 * dateString ko ek behtar format (e.g., "June 23, 2025") mein convert karta hai.
 * @param {string} dateString - ISO format ki date string.
 * @returns {string} Formatted date.
 */
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default formatDate;