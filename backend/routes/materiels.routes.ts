import expressRouter from 'express';
import { GetMateriels, GetMaterielByCategorie, PostMateriel } from '../controllers/materiel.controller';
const router = expressRouter.Router();

router.get('/getMateriels', GetMateriels);
router.get('/getMaterielsByCategorie/:id', GetMaterielByCategorie);

// ! DEV ONLY
router.post('/postMateriel', PostMateriel);

module.exports = router;