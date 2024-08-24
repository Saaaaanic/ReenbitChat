import { Request, Response } from 'express';
import Chat, { IChat } from '../models/Chat';

export const getChats = async (req: Request, res: Response) => {
    try {
        const chats = await Chat.find().populate('lastMessage').exec();
        res.json(chats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching chats' });
    }
};

export const createChat = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName } = req.body;
        const newChat = new Chat({ firstName, lastName });
        await newChat.save();
        res.status(201).json(newChat);
    } catch (error) {
        res.status(400).json({ message: 'Error creating chat' });
    }
};

export const updateChat = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { firstName, lastName } = req.body;
        const updatedChat = await Chat.findByIdAndUpdate(
            id,
            { firstName, lastName },
            { new: true }
        );
        if (!updatedChat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.json(updatedChat);
    } catch (error) {
        res.status(400).json({ message: 'Error updating chat' });
    }
};

export const deleteChat = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedChat = await Chat.findByIdAndDelete(id);
        if (!deletedChat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.json({ message: 'Chat deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting chat' });
    }
};