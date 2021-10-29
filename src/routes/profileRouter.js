import express from 'express';
import middlewares from '../middlewares';
import { profileController } from '../controllers';

const profileRouter = express.Router();

profileRouter.get('/:id', profileController.getProfile);

export default profileRouter;
