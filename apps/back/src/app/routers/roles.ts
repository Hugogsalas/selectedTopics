import * as express from 'express';
import * as rolesController from '../controllers/roles';

const router = express.Router();

router.post('/', rolesController.create);
router.get('/', rolesController.get);
router.put('/', rolesController.updateById);
router.delete('/', rolesController.deleteById);

export default router;
