import expressRouter from 'express'
import { GetChatRooms, GetUtilisateurChatRooms, PostChatRooms, AddUserToChatRoom, DeleteUserFromChatRoom,  DeleteChatRooms } from '../controllers/chatRooms.controller'
const router = expressRouter.Router()

router.get('/getChatRooms', GetChatRooms)
router.get('/getUtilisateurChatRooms/', GetUtilisateurChatRooms)
router.post('/postChatRooms', PostChatRooms)
router.post('/addUserToChatRoom/:id', AddUserToChatRoom)
router.delete('/deleteUserFromChatRoom/:id', DeleteUserFromChatRoom)
router.delete('/deleteChatRooms/:id', DeleteChatRooms)

module.exports = router