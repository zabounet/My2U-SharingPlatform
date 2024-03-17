import mongoose from "mongoose";
import chatRoomModel from "../models/chatRooms.model";

/**
 * Crud ChatRoom
 * 
 * Récuperer les chatRooms
 * Ajouter un chatRoom
 * Ajouter un utilisateur à un chatRoom
 * Supprimer un chatRoom
 */

export const GetChatRooms = async (req: any, res: any): Promise<void> => {
    const post = await chatRoomModel.find()
    res.status(200).json(post)
}

export const GetUtilisateurChatRooms = async (req: any, res: any): Promise<void> => {
    if(!req.session.sessionInfos) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }
    const post = await chatRoomModel.find();

    let userChatRooms: Array<any> = []
    let userId = new mongoose.Types.ObjectId(req.session.sessionInfos._id)
    for (let i = 0; i < post.length; i++) {
        post[i].Utilisateurs.forEach((element: any) => {
            // console.log(element._id,"\n",userId)
            if(element._id.toString() === userId.toString()) {
                // console.log("je suis dans le if");
                if(!userChatRooms.includes(post[i]))
                    userChatRooms.push(post[i])
            }
        })
    }

    res.status(200).json(userChatRooms)
}

export const PostChatRooms = async (req: any, res: any): Promise<void> => {

    const chatrooms = await chatRoomModel.find()
    chatrooms.forEach((chatroom) => {
        if(chatroom.Utilisateurs.includes(req.body.Utilisateurs[0]) && chatroom.Utilisateurs.includes(req.body.Utilisateurs[1])) {
            res.status(200).json(chatroom)
            return
        }
    })

    const post = new chatRoomModel(req.body)
    await post.save()
    res.status(200).json(post)
}

export const AddUserToChatRoom = async (req: any, res: any): Promise<void> => {
    const post = await chatRoomModel.findById(req.params.id)
    if(post) {
        if(post.Utilisateurs.includes(req.body.utilisateurs)) {
            res.status(200).json({ message: "User already in chatRoom" })
            return
        }
        await chatRoomModel.findByIdAndUpdate(post._id, { $push: { Utilisateurs: req.body.utilisateurs } })
        res.status(200).json(post)
    } else {
        res.status(404).json({ message: "ChatRoom not found" })
    }
}

export const DeleteUserFromChatRoom = async (req: any, res: any): Promise<void> => {
    const post = await chatRoomModel.findById(req.params.id)
    if(post) {
        if(post.Utilisateurs.includes(req.body.utilisateurs)) {
            await chatRoomModel
                .findByIdAndUpdate(post._id, { $pull: { Utilisateurs: req.body.utilisateurs } })
            res.status(200).json(post)
        }
    } else {
        res.status(404).json({ message: "ChatRoom not found" })
    }
}


export const DeleteChatRooms = async (req: any, res: any): Promise<void> => {
    const post = await chatRoomModel.findByIdAndDelete(req.params.id)
    res.status(200).json(post)
}
