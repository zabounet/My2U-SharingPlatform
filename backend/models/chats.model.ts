import mongoose, { Document, Schema } from "mongoose";

interface IChat extends Document {
    chatRoomId: mongoose.Types.ObjectId;
    Messages: [
        {
            Auteur: mongoose.Types.ObjectId;
            Contenu: string;
            Date: Date;
        }
    ];
}

const ChatSchema: Schema<IChat> = new Schema<IChat>({
    chatRoomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatRooms',
        required: true
    },
    Messages: [
        {
            Auteur: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Utilisateurs',
                required: true
            },
            Contenu: {
                type: String,
                required: true
            },
            Date: {
                type: Date,
                required: true,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true
    }
)

export default mongoose.model('Chat', ChatSchema)