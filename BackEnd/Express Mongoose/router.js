import Router from 'express';
import SecretController from './secretController.js';
const router = new Router();

// router.post('/makeSecret', SecretController.create);
router.post('/makeReusableSecret', SecretController.createReusable);
router.post('/makeDisposableSecret', SecretController.createDisposable);
router.get('/getSecret/:id', SecretController.getSecret);
router.get('/getAndDeleteSecret/:id', SecretController.getAndDeleteSecret);

export default router;
