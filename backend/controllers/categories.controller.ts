import categoriesModel from "../models/categories.model";

/**
 * Crud Categories
 * 
 * Récuperer les categories
 */
export const GetCategories = async (req: any, res: any): Promise<void> => {
    const post = await categoriesModel.find()
    res.status(200).json(post)
}

export const GetCategoriesByType = async (req: any, res: any): Promise<void> => {
    const post = await categoriesModel.find({Type: req.params.type}) 
    
    
    res.status(200).json(post)
}

export const GetCategoriesById = async (req: any, res: any): Promise<void> => {
    const post = await categoriesModel.findById(req.params.id)
    res.status(200).json(post)
}


// ! DEV ONLY
export const PostCategories = async (req: any, res: any): Promise<void> => {
    const post = new categoriesModel(req.body)
    await post.save()
    console.log("Ressources added successfully")
    res.status(201).json(post)
}