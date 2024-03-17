import mongoose, { Document, Schema } from "mongoose";

interface ICommunaute extends Document {
    Nom: string;
    CategorieCommunaute: mongoose.Types.ObjectId;
    Description: string;
    Createur: mongoose.Types.ObjectId;
    Photo: string;
    Membres: [
        {
            Utilisateur: mongoose.Types.ObjectId
        }
    ];
}

const CommunauteSchema: Schema<ICommunaute> = new Schema<ICommunaute>({
    Nom: {
        type: String,
        required: true,
        unique: true,
    },
    CategorieCommunaute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        required: true
    },
    Description: {
        type: String,
        required: true,
        minlength: 10
    },
    Createur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateurs',
        required: true
    },
    Photo: {
        type: String,
        default: "defaultCommunaute.jpg",
        required: true
    },
    Membres: {
        type: [
            {
                Utilisateur: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Utilisateurs'
                }
            }
        ],
        default: []
    }
}, {
    timestamps: true
    }
)

export default mongoose.model('Communautes', CommunauteSchema)