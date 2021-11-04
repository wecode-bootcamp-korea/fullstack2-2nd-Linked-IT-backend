import express from 'express';
import { mayKnowFriendController } from '../controllers';

const Router = express.Router();

Router.get('/:id', mayKnowFriendController.getMayKnowFriends);

export default Router;
