// backend/middlewares/uploadMiddleware.js

const multer = require('multer');
const path = require('path');

// Storage engine ko setup karein
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Files 'uploads/' folder mein save hongi
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    // File ka naam unique banane ke liye fieldname, timestamp, aur extension ko jorein
    // Example: image-1678886400000.jpg
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Check karein ke file type image hai ya nahi
function checkFileType(file, cb) {
  // Sirf in file types ki ijazat hai
  const filetypes = /jpg|jpeg|png|gif/;
  // File ka extension check karein
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // File ka MIME type check karein
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    // Agar file type match na ho to error dein
    cb(new Error('Sirf images hi upload ki ja sakti hain! (jpg, jpeg, png, gif)'), false);
  }
}

// Multer configuration
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
});

module.exports = upload;