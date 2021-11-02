import express from 'express';
import { searchController } from '../controllers';
const router = express.Router();

router.get('/company', searchController.getSearchCompanyList);
router.get('/user', searchController.getSearchUserList);

export default router;
