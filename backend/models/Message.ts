import mongoose, { Schema, Document } from 'mongoose';

interface IMessage extends Document {
    text: string;
}

const MessageSchema: Schema = new Schema({
    text: { type: String, required: true }
});

export default mongoose.model<IMessage>('Message', MessageSchema);
