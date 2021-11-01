import express from 'express';
import friendCardRouter from './friendCardRouter';

const Router = express.Router();

Router.use('/profile', friendCardRouter);

export default Router;
