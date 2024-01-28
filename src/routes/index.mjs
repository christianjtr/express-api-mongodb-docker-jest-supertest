import { Router } from 'express';
import apiHealthCheckRouter from './apiHealthChecks.route';
import courierRouter from './couriers.route';

const router = Router();

router.use('/health-checks', apiHealthCheckRouter);
router.use('/couriers', courierRouter);

export default router;
