import express from 'express';
import { searchController } from '../controllers';
const router = express.Router();

router.get('/company', searchController.getSearchCompanyList);
router.get('/user', searchController.getSearchUserList);
router.get('/all', searchController.getSearchAllList);

export default router;
