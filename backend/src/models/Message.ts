import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
    chatId: mongoose.Types.ObjectId;
    content: string;
    sender: 'user' | 'bot';
    createdAt: Date;
}

const MessageSchema: Schema = new Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        enum: ['user', 'bot'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IMessage>('Message', MessageSchema);