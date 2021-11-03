import express from 'express';
import { employmentController } from '../controllers';

const router = express.Router();

router.get('/', employmentController.getJobPostingList);
router.get('/:id', employmentController.getJobPostingDetail);

export default router;
