import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Message from '../models/Message';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || '')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.post('/message', async (req, res) => {
    const { text } = req.body;

    try {
        const message = new Message({ text });
        await message.save();
        res.status(201).send(message);
    } catch (error) {
        res.status(500).send('Error saving message');
    }
});

app.get('/', async (req, res) => {
    try {
        const message = await Message.findOne().sort({ _id: -1 });
        res.send(message?.text || 'No messages yet');
    } catch (error) {
        res.status(500).send('Error retrieving message');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
