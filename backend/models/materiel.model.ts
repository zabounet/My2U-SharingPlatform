import mongoose, { Document, Schema } from "mongoose";

interface IMateriel extends Document {
    Nom: string;
    Categorie: mongoose.Types.ObjectId;
}

const MaterielSchema: Schema<IMateriel> = new Schema<IMateriel>({
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

export default mongoose.model('Materiels', MaterielSchema)