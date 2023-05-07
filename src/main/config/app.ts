import express from 'express';
import setupRoutes from './routes';
import setupMiddewares from './middlewares';

const app = express();

setupMiddewares(app);
setupRoutes(app);

export default app;