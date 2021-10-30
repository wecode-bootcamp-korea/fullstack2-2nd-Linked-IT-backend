import express from 'express';
import employmentRoute from './employmentRouter';
// import commentRoute from './commentRouter';
// import mainRoute from './mainRouter';
// import profileRoute from './profileRouter';
// import searchRoute from './searchRouter';
// import userRoute from './userRouter';
const router = express.Router();

router.use('/jobs', employmentRoute);

// router.use('./comment', commentRoute);
// router.use('/main', mainRoute);
// router.use('/profile', profileRoute);
// router.use('/user', userRoute);
// router.use('/search', searchRoute);

export default router;
