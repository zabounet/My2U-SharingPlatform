import mongoose, { Document, Schema } from "mongoose";
interface ICategorie extends Document {
    Nom: string;
    Pictogramme: string;
    Type: string;
}

const CategoriesSchema: Schema<ICategorie> = new Schema<ICategorie>({
    Nom: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        unique: true
    },
    Pictogramme: {
        type: String,
        required: true,
        default: "picto.png"
    },
    Type: {
        type: String,
        required: true,
        enum: ['Materiel', 'Service']
    }
})

export default mongoose.model('categories', CategoriesSchema)