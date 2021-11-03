import express from 'express';
import { friendController } from '../controllers';

const router = express.Router();

router.get('/:userId', friendController.getMyFriendList);
router.get('/:userId/totalCount', friendController.getTotalFriendCount);
router.get('/:userId/acquaintance', friendController.getFriend);

export default router;
