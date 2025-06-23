// backend/server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // 'path' module zaroori hai
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');

// Import routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api', commentRoutes);
app.use('/api/upload', uploadRoutes);

// --- Static Folder Setup ---
// YEH LINE HATA DI GAYI HAI: const __dirname = path.resolve();
// __dirname ko dobara declare karne ki zaroorat nahi hai kyunke yeh CommonJS mein pehle se mojood hota hai.
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Simple Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the MERN Blogging Platform API' });
});

// --- Central Error Handler ---
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});