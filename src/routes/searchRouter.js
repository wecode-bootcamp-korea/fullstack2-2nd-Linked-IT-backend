import express from 'express';
import middlewares from '../middlewares';
import { searchController } from '../controllers';

const searchRouter = express.Router();

export default searchRouter;