import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { env } from '../lib/env';
import { errorHandler } from './middleware/error';
import { checkDatabaseConnection, runMigrations } from '../lib/db';

// Import routes
import authRoutes from './routes/auth';
import collectionsRoutes from './routes/collections';
import researchRoutes from './routes/research';
import experimentsRoutes from './routes/experiments';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW,
  max: env.RATE_LIMIT_MAX
});
app.use(limiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/collections', collectionsRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/experiments', experimentsRoutes);

// Error handling
app.use(errorHandler);

// Health check
app.get('/health', async (req, res) => {
  const dbConnected = await checkDatabaseConnection();
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: dbConnected ? 'connected' : 'disconnected'
  });
});

// Start server
async function startServer() {
  try {
    // Run database migrations
    await runMigrations();
    
    // Start listening
    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});

startServer();