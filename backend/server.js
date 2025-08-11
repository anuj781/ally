import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import connectToDb from './config/db.js';
import enquiryRoutes from './routes/enquiryRoutes.js';

const app = express();
const port = process.env.PORT || 9988;

// Connect to MongoDB
connectToDb();

// Middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use('/enquiry', enquiryRoutes);

// Serve Vite build in production
if (process.env.NODE_ENV === 'production') {
  const clientDistPath = path.join(__dirname, 'client', 'dist');
  app.use(express.static(clientDistPath));

  // Serve index.html for any unknown route
  app.get('*', (_, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  // Dev mode route
  app.get('/', (_, res) => {
    res.send('API is running in development mode');
  });
}

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
