import express from 'express';
import { friendController } from '../controllers';

const router = express.Router();

router.get('/:userid', friendController.getFriend);

export default router;
