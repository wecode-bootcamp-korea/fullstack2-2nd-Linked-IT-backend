import express from 'express';
import userRoute from './userRouter';

const router = express.Router();

router.use('/user', userRoute);

export default router;
