import express from 'express';
import { friendController } from '../controllers';

const router = express.Router();

// router.get('/:userid', friendController.getFriend);
router.get('/my', friendController.getMyFriendList);

export default router;
