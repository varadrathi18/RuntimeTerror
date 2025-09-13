// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import dotenv from 'dotenv';
// import { connectDB } from './config/db.js';
// import authRoutes from './routes/auth.js';
// import profileRoutes from './routes/profile.js';

// dotenv.config();

// const app = express();

// // Middleware
// app.use(helmet());
// app.use(express.json());
// app.use(morgan('dev'));

// // CORS
// // For dev we allow all origins (but you can restrict by setting ALLOWED_ORIGIN in .env)
// const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
// app.use(cors({
//   origin: (origin, cb) => cb(null, true),
//   credentials: false,
// }));

// // Routes
// app.get('/', (req, res) => res.json({ ok: true, message: 'SIH RuntimeTerror API' }));
// app.use('/', authRoutes);
// app.use('/', profileRoutes);

// // DB & Server
// const PORT = process.env.PORT || 5000;
// connectDB().then(() => {
//   app.listen(PORT, () => console.log("Mongo URI from .env:", process.env.MONGO_URI));
// }).catch(err => {
//   console.error('Failed to connect DB', err);
//   process.exit(1);
// });

import dotenv from 'dotenv';
dotenv.config(); // load .env before anything else

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// CORS
// For dev we allow all origins (restrict later with ALLOWED_ORIGIN in .env)
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
app.use(cors({
  origin: allowedOrigin === '*' ? true : allowedOrigin,
  credentials: false,
}));

// Routes
app.get('/', (req, res) => res.json({ ok: true, message: 'SIH RuntimeTerror API' }));
app.use('/', authRoutes);
app.use('/', profileRoutes);

// DB & Server
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("✅ Mongo URI from .env:", process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`🚀 API listening on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect DB', err);
    process.exit(1);
  });
