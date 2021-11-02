import express from 'express';
import employmentRoute from './employmentRouter';
import searchRoute from './searchRouter';
// import commentRoute from './commentRouter';
// import mainRoute from './mainRouter';
// import profileRoute from './profileRouter';
// import userRoute from './userRouter';
const router = express.Router();

router.use('/jobs', employmentRoute);
router.use('/search', searchRoute);

// router.use('./comment', commentRoute);
// router.use('/main', mainRoute);
// router.use('/profile', profileRoute);
// router.use('/user', userRoute);

export default router;
