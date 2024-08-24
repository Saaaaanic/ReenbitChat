import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import chatRoutes from './routes/ChatRoute';
import messageRoutes from './routes/MessageRoutes';
import {seedPredefinedChats} from "./seedData";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/chat_app')
    .then(() => {
        console.log('Connected to MongoDB');
        seedPredefinedChats();
    })
    .catch((error) => console.error('MongoDB connection error:', error));

app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});