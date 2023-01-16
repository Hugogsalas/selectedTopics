import * as express from 'express';
import * as tipoPagoController from '../controllers/tipoPago';

const router = express.Router();

router.post('/', tipoPagoController.create);
router.get('/', tipoPagoController.get);
router.put('/', tipoPagoController.updateById);
router.delete('/', tipoPagoController.deleteById);

export default router;
