import express from 'express';
import middlewares from '../middlewares';
import { profileController } from '../controllers';

const profileRouter = express.Router();

profileRouter.get('/:id', profileController.getProfile);
profileRouter.get('/education/:id', profileController.getEducation);
profileRouter.get('/career/:id', profileController.getCareer);

export default profileRouter;
