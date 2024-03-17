import expressRouter from 'express';
import { GetCategories, GetCategoriesByType, GetCategoriesById, PostCategories } from '../controllers/categories.controller';
const router = expressRouter.Router();

router.get('/getCategories', GetCategories);
router.get('/getCategoriesByType/:type', GetCategoriesByType);
router.get('/getCategoriesById/:id', GetCategoriesById);
router.post('/postCategories', PostCategories);

module.exports = router;