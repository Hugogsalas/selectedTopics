import * as express from 'express';
import * as cargoController from '../controllers/cargo';

const router = express.Router();

router.post('/', cargoController.create);
router.get('/', cargoController.get);
router.put('/', cargoController.updateById);
router.delete('/', cargoController.deleteById);

export default router;
