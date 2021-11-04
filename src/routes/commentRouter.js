import express from 'express';
import { commentController } from '../controllers';
const router = express.Router();

router.get('/', commentController.getCommentOfPost);
router.post('/create', commentController.createCommentOfPost);
// router.post('/createSub', commentController.createSubCommentOfPost);
router.patch('/update', commentController.updateCommentOfPost);
router.delete('/delete', commentController.deleteCommentOfPost);
router.get('/getLike', commentController.getLikeByComment);
router.post('/addLike', commentController.addLike);
router.delete('/cancelLike', commentController.cancelLike);

export default router;
