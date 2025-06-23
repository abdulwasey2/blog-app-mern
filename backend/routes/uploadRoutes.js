// backend/routes/uploadRoutes.js

const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

// @route   POST /api/upload
// @desc    Upload an image file
// @access  Private (hum isay protect kar sakte hain, lekin abhi ke liye public rakhte hain)
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Please select a file to upload.');
  }
  
  // Windows paths (\) ko web paths (/) mein badalne ke liye
  const imagePath = `/${req.file.path.replace(/\\/g, "/")}`;

  res.status(201).send({
    message: 'Image uploaded successfully',
    image: imagePath,
  });
});

module.exports = router;