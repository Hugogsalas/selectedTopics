import * as express from 'express';
import * as pagoController from '../controllers/pago';

const router = express.Router();

router.post('/', pagoController.create);
router.get('/', pagoController.get);
router.put('/', pagoController.updateById);
router.delete('/', pagoController.deleteById);

export default router;
