import express from 'express';
import employmentRoute from './employmentRouter';
import userRoute from './userRouter';
import companyRoute from './companyRouter';
import searchRoute from './searchRouter';
import postRoute from './postRouter';
import commentRoute from './commentRouter';

const router = express.Router();

router.use('/jobs', employmentRoute);
router.use('/user', userRoute);
router.use('/company', companyRoute);
router.use('/search', searchRoute);
router.use('/post', postRoute);
router.use('/comment', commentRoute);

export default router;
