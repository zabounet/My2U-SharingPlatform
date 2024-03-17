import expressRouter from 'express';
import { GetServices, GetServiceByCategorie, PostServices } from '../controllers/services.controller';
const router = expressRouter.Router();

router.get('/getServices', GetServices);
router.get('/getServicesByCategorie/:id', GetServiceByCategorie);

// ! DEV ONLY
router.post('/postServices', PostServices);

module.exports = router;