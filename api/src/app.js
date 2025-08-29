const express = require('express');
const cors = require('cors');
// const multer = require('multer');
const path = require('path');
const fs = require('fs');
const excelController = require('./controllers/excelController');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure data directories exist
const uploadsDir = path.join(__dirname, '../data/uploads');
const parsedDir = path.join(__dirname, '../data/parsed');

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(parsedDir)) fs.mkdirSync(parsedDir, { recursive: true });

// Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadsDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.post('/api/upload', upload.single('file'), excelController.parseExcelFile);
// app.get('/api/latest', excelController.getLastParsedFile);
app.get('/api/data', excelController.processAndGetLatestData);

// app.get('/api/generate-upload-url', (req, res) => {
//   // In a local filesystem implementation, we don't need pre-signed URLs
//   // This endpoint is maintained for API compatibility
//   res.json({ url: '/api/upload' });
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});