import express from 'express';
import { getChats, createChat, updateChat, deleteChat } from '../controllers/ChatController';

const router = express.Router();

router.get('/', getChats);
router.post('/', createChat);
router.put('/:id', updateChat);
router.delete('/:id', deleteChat);

export default router;