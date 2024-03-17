import mongoose, { Document, Schema } from "mongoose";

interface IService extends Document {
    Nom: string;
    Categorie: mongoose.Types.ObjectId;
}

const ServiceSchema: Schema<IService> = new Schema<IService>({
    Nom: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        unique: true
    },
    Categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        required: true
    }
})

export default mongoose.model('Services', ServiceSchema)