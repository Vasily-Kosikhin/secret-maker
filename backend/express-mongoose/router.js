import Router from 'express';
import SecretController from './secretController.js';
const router = new Router();

router.post('/secret/create', SecretController.createSecret);
router.get('/secret/:id', SecretController.getSecret);

export default router;
