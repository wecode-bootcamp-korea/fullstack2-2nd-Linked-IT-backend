import profileRoute from './profileRouter';
import express from 'express';

const router = express.Router();

router.use('/profile', profileRoute);

export default router;
