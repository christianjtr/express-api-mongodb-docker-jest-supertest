import { Router } from 'express';
import HTTPStatus from 'http-status';

const router = Router();

/**
   * @method GET
   * @name get/health-checks/alive
   * @description Check whether API is alive or not
   * @param {string} path - Express path
   */
router.get('/alive', (_, response) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date(),
  };

  response.status(HTTPStatus.OK).send(data);
});

export default router;
