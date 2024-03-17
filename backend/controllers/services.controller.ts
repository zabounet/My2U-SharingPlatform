import servicesModel from "../models/services.model";

/**
 * Crud Services
 * 
 * Récuperer les services
 * Réuperer les services par categorie
 */

export const GetServices = async (req: any, res: any): Promise<void> => {
    const post = await servicesModel.find()
    res.status(200).json(post)
}
export const GetServiceByCategorie = async (req: any, res: any): Promise<void> => {
    const post = await servicesModel.find({ categorie: req.params.categorie })
    res.status(200).json(post)
}

// ! DEV ONLY
export const PostServices = async (req: any, res: any): Promise<void> => {
    const post = new servicesModel(req.body)
    await post.save()
    console.log("Ressources added successfully")
    res.status(201).json(post)
}
