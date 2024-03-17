import expressRouter from 'express';
import { 
    GetUtilisateurs, 
    GetUtilisateurById, 
    GetUtilisateurByGivenId,
    CheckUtilisateurLogins,
    PostUtilisateur, 
    ResetPassword, 
    ChangePassword,
    ReportUtilisateur, 
    EditUtilisateur, 
    AddCommunautesUtilisateur, 
    AddUtilisateursUtilisateur,
    GetUtilisateursCommunaute,
    DeleteCommunautesUtilisateur,
    DeleteUtilisateursUtilisateur,
    DeleteUtilisateur,
    searchUtilisateursByServices,
    searchUtilisateursName } from '../controllers/utilisateurs.controller';
const router = expressRouter.Router();

router.get('/getUtilisateurs', GetUtilisateurs);
router.get('/getUtilisateurById', GetUtilisateurById);
router.post('/getUtilisateursByGivenId', GetUtilisateurByGivenId);
router.post('/checkUtilisateurLogins', CheckUtilisateurLogins)
router.post('/postUtilisateur', PostUtilisateur);
router.put('/resetPassword', ResetPassword);
router.put('/changePassword/:id', ChangePassword);
router.put('/reportUtilisateur/:id', ReportUtilisateur);
router.put('/editUtilisateur/:id', EditUtilisateur);
router.put('/addCommunautesUtilisateur/:id', AddCommunautesUtilisateur);
router.put('/addUtilisateursUtilisateur/:id', AddUtilisateursUtilisateur);
router.get('/getUtilisateursCommunaute/:id', GetUtilisateursCommunaute);
router.put('/deleteCommunautesUtilisateur/:id', DeleteCommunautesUtilisateur);
router.put('/deleteUtilisateursUtilisateur/:id', DeleteUtilisateursUtilisateur);
router.delete('/deleteUtilisateur/:id', DeleteUtilisateur); 
router.get('/searchUtilisateursByServices', searchUtilisateursByServices);
router.get('/searchUtilisateursName', searchUtilisateursName);

module.exports = router