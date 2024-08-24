import { Request, Response } from 'express';
import Message from '../models/Message';
import { getRandomQuote } from '../services/QuoteService';

export const getMessages = async (req: Request, res: Response) => {
    try {
        const chatId = req.params.chatId;
        const messages = await Message.find({ chatId }).sort('createdAt');
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages' });
    }
};

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { chatId, content } = req.body;
        const newMessage = new Message({ chatId, content, sender: 'user' });
        await newMessage.save();

        res.status(201).json(newMessage);

        setTimeout(async () => {
            const quote = await getRandomQuote();
            const autoResponse = new Message({ chatId, content: quote, sender: 'bot' });
            await autoResponse.save();

            console.log('Auto-response created:', autoResponse);
        }, 3000);
    } catch (error) {
        res.status(400).json({ message: 'Error sending message' });
    }
};