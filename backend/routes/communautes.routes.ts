import expressRouter from 'express'
import { GetCommunautes, GetCommunauteByCategorie, GetCommunauteById, GetSeveralCommunauteById, SearchCommunautes, PostCommunautes, AddMembreCommunaute, DeleteMembreCommunaute, DeleteCommunautes } from '../controllers/communautes.controller'
const router = expressRouter.Router()

router.get('/getCommunautes', GetCommunautes)
router.get('/getCommunautesByCategorie/:id', GetCommunauteByCategorie)
router.get('/getCommunauteById/:id', GetCommunauteById)
router.get('/searchCommunautes', SearchCommunautes)
router.post('/getSeveralCommunauteById', GetSeveralCommunauteById)
router.post('/postCommunautes', PostCommunautes)
router.put('/addMembreCommunaute/:id', AddMembreCommunaute) 
router.put('/deleteMembreCommunaute/:id', DeleteMembreCommunaute)
router.delete('/deleteCommunaute/:id', DeleteCommunautes)

module.exports = router