import express from 'express';
import { friendController } from '../controllers';

const router = express.Router();

router
  .get('/:userId', friendController.getFriendListByStatus)
  .get('/:userId/totalCount', friendController.getTotalFriendCount)
  .get('/:userId/acquaintance', friendController.getFriend)
  .post('/', friendController.addFriend)
  .delete('/', friendController.deleteFriend);

export default router;
