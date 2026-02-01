import { Router } from 'express';

import authRouter from './routes/authRouter.js';
import adminRouter from './routes/adminRouter.js';
import healtRouter from './routes/healthRouter.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/health', healtRouter);

export default router;
