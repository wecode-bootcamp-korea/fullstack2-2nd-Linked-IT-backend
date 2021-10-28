import express from 'express';
import middleware from '../middleware';
import { commentController } from '../controllers';

const commentRouter = express.Router();

export default commentRouter;
