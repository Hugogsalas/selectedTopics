import * as express from 'express';
import * as usuarioController from '../controllers/usuario';

const router = express.Router();

router.post('/', usuarioController.create);
router.get('/', usuarioController.get);
router.put('/', usuarioController.updateById);
router.delete('/', usuarioController.deleteById);

export default router;
