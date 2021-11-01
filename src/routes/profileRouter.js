import express from 'express';
import { profileController } from '../controllers';

const Router = express.Router();

Router.get('/:id', profileController.getProfile);
Router.get('/education/:id', profileController.getEducation);
Router.get('/career/:id', profileController.getCareer);

export default Router;
