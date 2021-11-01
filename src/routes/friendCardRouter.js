import express from 'express';
import { friendCardController } from '../controllers';

const Router = express.Router();

Router.get('/friend/:id', friendCardController.getMayKnowFriends);

export default Router;
