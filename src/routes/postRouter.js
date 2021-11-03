import express from 'express';
import { postController } from '../controllers';
const router = express.Router();

router.get('/read', postController.readPost);
router.post('/create', postController.createPost);
router.post('/hashtag', postController.createHashtag);
router.patch('/update', postController.updatePost);
router.delete('/delete', postController.deletePost);

export default router;
