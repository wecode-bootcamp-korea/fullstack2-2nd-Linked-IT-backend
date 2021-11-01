import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import router from './src/routes';

const app = express();

app.use(morgan('dev'));

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(router);

app.get('/ping', (req, res) => {
  res.json('pong');
});

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
