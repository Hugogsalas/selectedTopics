import * as express from 'express';
import * as trabajadorController from '../controllers/trabajador';

const router = express.Router();

router.post('/', trabajadorController.create);
router.get('/', trabajadorController.get);
router.put('/', trabajadorController.updateById);
router.delete('/', trabajadorController.deleteById);

export default router;
