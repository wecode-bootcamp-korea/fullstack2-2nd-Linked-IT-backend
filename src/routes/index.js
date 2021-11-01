import express from 'express';
import employmentRoute from './employmentRouter';
import profileRoute from './profileRouter';

const router = express.Router();

router.use('/jobs', employmentRoute);
router.use('/profile', profileRoute);

export default router;
