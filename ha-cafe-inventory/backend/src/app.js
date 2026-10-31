import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import healthRoutes from './routes/health.js';
import productRoutes from './routes/products.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientOrigin, credentials: true }));
app.use(express.json());
if (env.nodeEnv !== 'test') app.use(morgan('dev'));

app.use('/api/health', healthRoutes);
app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
