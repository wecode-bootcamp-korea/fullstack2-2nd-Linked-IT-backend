import express from 'express';
import { profileController } from '../controllers';

const Router = express.Router();

Router.get('/:userid', profileController.getProfile);
Router.get('/education/:userid', profileController.getEducation);
Router.get('/career/:userid', profileController.getCareer);

export default Router;
