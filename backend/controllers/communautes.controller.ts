import communautesModel from "../models/communautes.model";
import categoryModel from "../models/categories.model";
import mongoose from "mongoose";

/**
 * Crud Communautes
 * 
 * Récuperer les communautes
 * Ajouter une communaute
 * Supprimer une communaute
 * Ajouter un membre à une communaute
 * Récuperer les communautes par categorie
 * Récuperer une communaute par id
 * Récupérer les informations d'un membre d'une communaute
 */

export const GetCommunautes = async (req: any, res: any): Promise<void> => {
    const post = await communautesModel.find()
    if(post){
        for (let i = 0; i < post.length; i++) {
            const Categorie = await categoryModel.findById({_id: post[i].CategorieCommunaute}).select('Pictogramme Nom -_id')
            if(Categorie) post[i].set('Categorie', Categorie, { strict: false })
        }
    }
    res.status(200).json(post)
}

export const GetCommunauteByCategorie = async (req: any, res: any): Promise<void> => {
    const post = await communautesModel.find({ categorie: req.params.categorie })
    if(post){
        for (let i = 0; i < post.length; i++) {
            const Categorie = await categoryModel.findById({_id: post[i].CategorieCommunaute}).select('Pictogramme Nom -_id')
            if(Categorie) post[i].set('Categorie', Categorie, { strict: false })
        }
    }
    res.status(200).json(post)
}

export const GetCommunauteById = async (req: any, res: any): Promise<void> => {
        
    const post = await communautesModel.findById(req.params.id)
    if(post){
        const Categorie = await categoryModel.findById({_id: post.CategorieCommunaute}).select('Pictogramme Nom -_id')
        if(Categorie) post.set('Categorie', Categorie, { strict: false })
    }
   

    res.status(200).json(post)
}

export const SearchCommunautes = async (req: any, res: any): Promise<void> => {
    const post = await communautesModel.find({ Nom: { $regex: req.query.q, $options: 'i' } })
    if(post){
        for (let i = 0; i < post.length; i++) {
            const Categorie = await categoryModel.findById({_id: post[i].CategorieCommunaute}).select('Pictogramme Nom -_id')
            if(Categorie) post[i].set('Categorie', Categorie, { strict: false })
        }
    }
    res.status(200).json(post)
}

export const GetSeveralCommunauteById = async (req: any, res: any): Promise<void> => {
    // Extract the "Communaute" values into an array
    const communauteIds = req.body.map((item: any) => item.Communaute);

    const post = await communautesModel.find({_id: { $in: communauteIds }})
    
    if(post){
        for (let i = 0; i < post.length; i++) {
            const Categorie = await categoryModel.findById({_id: post[i].CategorieCommunaute}).select('Pictogramme Nom -_id')
            if(Categorie) post[i].set('Categorie', Categorie, { strict: false })
        }
    }
    res.status(200).json(post)
}
export const PostCommunautes = async (req: any, res: any): Promise<void> => {
    const post = new communautesModel(req.body)
    await post.save()
    console.log("Ressources added successfully")
    res.status(201).json(post)
}

export const AddMembreCommunaute = async (req: any, res: any): Promise<void> => {
    const ObjectId = new mongoose.Types.ObjectId(req.body.Membre)

    const post = await communautesModel.findByIdAndUpdate(req.params.id, 
        { 
            $push: { 
                Membres: {
                    Utilisateur: ObjectId,
                } 
            } 
        })
    res.status(200).json(post)
}

export const DeleteMembreCommunaute = async (req: any, res: any): Promise<void> => {
    const post = await communautesModel.findByIdAndUpdate(req.params.id, { $pull: { Membres: req.body.Membre } })
    res.status(200).json(post)
}

export const DeleteCommunautes = async (req: any, res: any): Promise<void> => {
    const post = await communautesModel.findByIdAndDelete(req.params.id)
    res.status(200).json(post)
}