import { Router } from 'express';

import authRouter from './routes/authRouter.js';
import adminRouter from './routes/adminRouter.js';
import EmailRouter from './routes/emailRouter.js';
import healtRouter from './routes/healthRouter.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/email', EmailRouter);
router.use('/health', healtRouter);

export default router;
