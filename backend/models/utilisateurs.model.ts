import mongoose, { Document, Schema } from "mongoose";
import argon2 from "argon2";

interface IUtilisateur extends Document {
    NomPrenom: string;
    Genre: string;
    Email: string;
    MotDePasse: string;
    DateDeNaissance: string;
    Ville: string;
    Interets: string[];
    Materiels: { Nom: string; Disponible: boolean }[];
    Services: string[];
    utilisateursSuivis: mongoose.Types.ObjectId[];
    communautésSuivies: mongoose.Types.ObjectId[];
    Photo: string;
    WasReset: boolean;
    Reported: number;
    Banned: boolean;
    Karma: number;
    GaveKarma: mongoose.Types.ObjectId[];
    Vacances: boolean;
    Notifications: { Type: string; Message: string; Date: string; Lu: boolean }[];
    NotificationsActives: boolean;
}

const UtilisateurSchema: Schema<IUtilisateur> = new Schema<IUtilisateur>({
    NomPrenom: {
        type: String,
        default: "John Doe",
        minlength: 3,
        maxlength: 100
    },
    Genre: {
        type: String,
        default: "Non spécifié",
        enum: ["Homme", "Femme", "Autre", "Non spécifié"]
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 200
    },
    MotDePasse: {
        type: String,
        required: true,
        maxlength: 255
    },
    DateDeNaissance: {
        type: String,
        default: "01-01-1970"
    },
    Ville: {
        type: String,
        default: "Blois",
        minlength: 3,
        maxlength: 100
    },
    Interets: {
        type: [
            {
                Nom: String,
            }
        ],
        default: []
    },
    Materiels: {
        type:[
            {
                Nom: String,
                Disponible: {
                    type: Boolean,
                    default: true
                }
            }
        ],
        default: []
    },
    Services: {
        type:[
            {
                Nom: String
            }
        ],
        default: []
    },
    utilisateursSuivis: {
        type: [
            {
                Utilisateur: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'utilisateurs'
                }
            }
        ],
        default: []
    },
    communautésSuivies: {
        type: [
            {
                Communaute:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'communautes'
                } 
            }
        ],
        default: []
    },
    Photo: {
        type: String,
        default: "default.jpg",
        maxlength: 255
    },
    WasReset: {
        type: Boolean,
        default: false
    },
    Reported: {
        type: Number,
        default: 0
    },
    Banned: {
        type: Boolean,
        default: false
    },
    Karma: {
        type: Number,
        default: 0
    },
    GaveKarma: {
        type: [
            {
                Utilisateur:{ 
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'utilisateurs'
                }
            }
        ],
        default: []
    },
    Vacances: {
        type: Boolean,
        default: false
    },
    Notifications: {
        type: [
            {
                Type: String,
                Message: String,
                Date: String,
                Lu: Boolean
            }
        ],
        default: []
    },
    NotificationsActives: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

// Pre-save hook to hash the password using argon2
UtilisateurSchema.pre<IUtilisateur>('save', async function(next: any) {
    try {
        if (!this.isModified('MotDePasse')) {
            return next();
        }
        const hashedPassword = await argon2.hash(this.MotDePasse);
        this.MotDePasse = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

export default mongoose.model('utilisateurs', UtilisateurSchema)