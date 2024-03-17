import mongoose, {Document, Schema} from 'mongoose'

interface IChatRoom extends Document {
    Utilisateurs: [
        {
            User: mongoose.Types.ObjectId
        }
    ];
    IsPrivate: boolean;
}

const ChatRoomSchema: Schema<IChatRoom> = new Schema<IChatRoom>({
    Utilisateurs: {
        type: [
            {
                User: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Utilisateurs'
                } 
            }
        ],
        default: [], 
        minlenght: 2,
        required: true
    },
    IsPrivate: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
    }
)

export default mongoose.model('ChatRooms', ChatRoomSchema)