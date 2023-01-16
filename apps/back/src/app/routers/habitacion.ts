import * as express from 'express';
import * as habitacionController from '../controllers/habitacion';

const router = express.Router();

router.post('/', habitacionController.create);
router.get('/', habitacionController.get);
router.put('/', habitacionController.updateById);
router.delete('/', habitacionController.deleteById);

export default router;
