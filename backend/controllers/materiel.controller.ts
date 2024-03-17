import materielModel from "../models/materiel.model";

/**
 * Crud Materiel
 * 
 * Récuperer les materiels
 * Réuperer les materiels par categorie
 */

export const GetMateriels = async (req: any, res: any): Promise<void> => {
    const post = await materielModel.find()
    res.status(200).json(post)
}
export const GetMaterielByCategorie = async (req: any, res: any): Promise<void> => {
    const post = await materielModel.find({ categorie: req.params.categorie })
    res.status(200).json(post)
}

// ! DEV ONLY
export const PostMateriel = async (req: any, res: any): Promise<void> => {
    const post = new materielModel(req.body)
    await post.save()
    console.log("Ressources added successfully")
    res.status(201).json(post)
}
