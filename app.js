import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import routes from './src/routes';

const app = express();

app.use(morgan('dev'));

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.use((req, res, next) => {
  next(new Error(`NOT_FOUND_${req.originalUrl}`));
});

app.use((err, req, res, next) => {
  if (err) {
    console.error('global error handler', err);
    const { status, message } = err;
    res.send(status || 500).json(message);
  }
});

export default app;
