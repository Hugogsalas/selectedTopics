import * as express from 'express';
import * as estatusHabitacionController from '../controllers/estatusHabitacion';

const router = express.Router();

router.post('/', estatusHabitacionController.create);
router.get('/', estatusHabitacionController.get);
router.put('/', estatusHabitacionController.updateById);
router.delete('/', estatusHabitacionController.deleteById);

export default router;
