import express from 'express';
import { employmentController } from '../controllers';
const router = express.Router();

router.get('/search', employmentController.getEmploymentAnnouncement);
router.get(
  '/search/detail',
  employmentController.getUserByEmploymentAnnouncementId
);
router.get('/search/profile', employmentController.getCompanyProfile);

export default router;
