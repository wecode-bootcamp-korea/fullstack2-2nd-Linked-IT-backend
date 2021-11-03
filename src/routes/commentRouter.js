import express from 'express';
import { commentController } from '../controllers';
const router = express.Router();

router.get('/', commentController.getCommentOfPost);

export default router;
