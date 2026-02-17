import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';

import pagesRouter from './routers/pagesRouter';
import apiRouter from './routers/apiRouter';
import ibgeRouter from './routers/ibgeRouter';

const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(express.json());

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));

// pages
app.use('/', pagesRouter);
// IBGE
app.use('/ibge', ibgeRouter);
// API
app.use('/customers', apiRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(error.message);
})

export default app;