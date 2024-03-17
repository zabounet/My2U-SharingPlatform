import mongoose from "mongoose";
import chatsModel from "../models/chats.model";

/**
 * Crud Chats
 * 
 * Récuperer les chats
 * Ajouter un chat
 * Ajouter un message à un chat
 * Supprimer un chat
 */

export const GetChats = async (req: any, res: any): Promise<void> => {
    const ObjectId = new mongoose.Types.ObjectId(req.params.id)
    const post = await chatsModel.findOne({chatRoomId: ObjectId})

    if(post) {
        // @ts-ignore
        post.Date = new Date(post.Date).toLocaleDateString()
    }
    res.status(200).json(post)
}

// export const PostChats = async (req: any, res: any): Promise<void> => {
//     const post = new chatsModel(req.body)
//     await post.save()
//     console.log("Ressources added successfully")
//     res.status(201).json(post)
// }

export const AddMessageToChat = async (req: any, res: any): Promise<void> => {
    // const chatRoomId = new mongoose.Types.ObjectId(req.params.id)
    
    const chat = await chatsModel.findOne({chatRoomId: req.params.id})

    if(!chat) {
        const post = new chatsModel({chatRoomId: req.params.id, Messages: [req.body]})
        await post.save()
        res.status(201).json(post)
        return
    } else {
        const ObjectId = new mongoose.Types.ObjectId(req.body.Auteur)
        const post = await chatsModel.findOneAndUpdate(
            {
                chatRoomId: req.params.id
            }, 
            { 
                $push: { 
                    Messages: { 
                        Auteur: ObjectId, 
                        Contenu: req.body.Contenu
                    }
                }
            }
            )
        res.status(200).json(post)
    }
}

export const DeleteChats = async (req: any, res: any): Promise<void> => {
    const post = await chatsModel.findByIdAndDelete(req.params.id)
    res.status(200).json(post)
}
