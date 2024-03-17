import expressRouter from 'express'
import { GetChats,/* PostChats, */ AddMessageToChat, DeleteChats } from '../controllers/chats.controller'
const router = expressRouter.Router()

router.get('/getChats/:id', GetChats)
// router.post('/postChats', PostChats)
router.post('/addMessageToChat/:id', AddMessageToChat)
router.delete('/deleteChats/:id', DeleteChats)

module.exports = router