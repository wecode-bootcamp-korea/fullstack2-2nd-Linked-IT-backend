import express from 'express';
import employmentRoute from './employmentRouter';
import userRoute from './userRouter';
import companyRoute from './companyRouter';
import searchRoute from './searchRouter';
import postRoute from './postRouter';
import commentRoute from './commentRouter';
import friendRoute from './friendRouter';

const router = express.Router();

router.use('/jobs', employmentRoute);
router.use('/user', userRoute);
router.use('/company', companyRoute);
router.use('/search', searchRoute);
router.use('/post', postRoute);
router.use('/comment', commentRoute);
router.use('/friend', friendRoute);

export default router;
