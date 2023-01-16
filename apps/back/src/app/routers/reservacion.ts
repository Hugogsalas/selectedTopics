import * as express from 'express';
import * as reservacionController from '../controllers/reservacion';

const router = express.Router();

router.post('/', reservacionController.create);
router.get('/', reservacionController.get);
router.put('/', reservacionController.updateById);
router.delete('/', reservacionController.deleteById);

export default router;
