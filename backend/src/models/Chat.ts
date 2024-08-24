import mongoose, { Schema, Document } from 'mongoose';

export interface IChat extends Document {
    firstName: string;
    lastName: string;
}

const ChatSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

export default mongoose.model<IChat>('Chat', ChatSchema);