import express from 'express';
import employmentRoute from './employmentRouter';
import searchRoute from './searchRouter';
import profileRoute from './profileRouter';
import mayKnowFriendRoute from './mayKnowFriendRouter';

const router = express.Router();

router.use('/jobs', employmentRoute);
router.use('/search', searchRoute);
router.use('/profile', profileRoute);
router.use('/friend', mayKnowFriendRoute);

export default router;
