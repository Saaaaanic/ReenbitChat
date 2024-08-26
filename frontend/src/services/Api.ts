import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getChats = async () => {
    const response = await axios.get(`${API_URL}/chats`);
    return response.data;
};

export const getChat = async (id: string) => {
    const response = await axios.get(`${API_URL}/chats/${id}`);
    return response.data;
};

export const createChat = async (firstName: string, lastName: string) => {
    const response = await axios.post(`${API_URL}/chats`, { firstName, lastName });
    return response.data;
};

export const updateChat = async (id: string, firstName: string, lastName: string) => {
    const response = await axios.put(`${API_URL}/chats/${id}`, { firstName, lastName });
    return response.data;
};

export const deleteChat = async (id: string) => {
    const response = await axios.delete(`${API_URL}/chats/${id}`);
    return response.data;
};

export const getMessages = async (chatId: string) => {
    const response = await axios.get(`${API_URL}/messages/${chatId}`);
    return response.data;
};

export const sendMessage = async (chatId: string, content: string) => {
    const response = await axios.post(`${API_URL}/messages`, { chatId, content });
    return response.data;
};