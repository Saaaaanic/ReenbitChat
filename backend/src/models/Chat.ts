import mongoose, { Schema, Document } from 'mongoose';
import {IMessage} from "./Message";

export interface IChat extends Document {
    firstName: string;
    lastName: string;
    lastMessage?: IMessage;
}

const ChatSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
});

ChatSchema.virtual('lastMessage', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'chatId',
    justOne: true,
    options: { sort: { createdAt: -1 } }
});

ChatSchema.set('toJSON', { virtuals: true });
ChatSchema.set('toObject', { virtuals: true });

export default mongoose.model<IChat>('Chat', ChatSchema);
