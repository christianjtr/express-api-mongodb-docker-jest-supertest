import { Router } from 'express';
import courierRouter from './couriers.route';

const router = Router();

router.use('/couriers', courierRouter);

export default router;
