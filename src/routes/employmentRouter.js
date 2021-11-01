import express from 'express';
import { employmentController } from '../controllers';
const router = express.Router();

router.get('/search', employmentController.getJobPostingList);
router.get('/search/detail', employmentController.getJobPostingDetail);

export default router;
