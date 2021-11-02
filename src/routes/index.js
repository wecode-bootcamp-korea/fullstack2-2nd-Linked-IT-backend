import express from 'express';
import employmentRoute from './employmentRouter';
import profileRoute from './profileRouter';
import friendRoute from './friendRouter';

const router = express.Router();

router.use('/jobs', employmentRoute);
router.use('/profile', profileRoute);
router.use('/friend', friendRoute);

export default router;
