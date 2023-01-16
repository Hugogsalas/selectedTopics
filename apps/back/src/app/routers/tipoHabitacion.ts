import * as express from 'express';
import * as tipoHabitacionController from '../controllers/tipoHabitacion';

const router = express.Router();

router.post('/', tipoHabitacionController.create);
router.get('/', tipoHabitacionController.get);
router.put('/', tipoHabitacionController.updateById);
router.delete('/', tipoHabitacionController.deleteById);

export default router;
