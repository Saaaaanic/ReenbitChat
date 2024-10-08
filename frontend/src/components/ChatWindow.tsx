import React, { useState, useEffect, useRef } from 'react';
import {getChat, getChats, getMessages, sendMessage} from '../services/Api';
import MessageInput from './MessageInput';
import { Chat } from "../interfaces/IChat";

interface Message {
    _id: string;
    content: string;
    sender: 'user' | 'bot';
    createdAt: string;
    chatId: string;
}

interface ChatWindowProps {
    selectedChat: Chat | null;
    onUpdateChat: (chat: Chat) => void;
    onDeleteChat: (chat: Chat) => void;
    onNewMessage: (chat: Chat, sender: string, message: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedChat, onUpdateChat, onDeleteChat, onNewMessage }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [lastMessage, setLastMessage] = useState<Message | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    useEffect(() => {
        if (selectedChat) {
            fetchMessages();
        }
    }, [selectedChat]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleDelete = () => {
        setIsDeleteConfirmOpen(true);
        setIsMenuOpen(false);
    };

    const confirmDelete = () => {
        if(selectedChat) {
            onDeleteChat(selectedChat);
            setIsDeleteConfirmOpen(false);
        }
    };

    const fetchMessages = async () => {
        if (selectedChat) {
            const fetchedMessages = await getMessages(selectedChat._id);
            setMessages(fetchedMessages);

            if (fetchedMessages.length > 0) {
                setLastMessage(fetchedMessages[fetchedMessages.length - 1]);
            }
        }
    };

    const handleSendMessage = async (content: string) => {
        if (selectedChat) {
            const newMessage = await sendMessage(selectedChat._id, content);
            setMessages(prevMessages => [...prevMessages, newMessage]);

            setTimeout(async () => {
                const fetchedMessages = await getMessages(selectedChat._id);
                setMessages(fetchedMessages);

                const lastFetchedMessage = fetchedMessages[fetchedMessages.length - 1];

                if (lastMessage && lastFetchedMessage._id !== lastMessage._id) {
                    const senderName = `${selectedChat.firstName} ${selectedChat.lastName}`;
                    onNewMessage(await getChat(lastMessage.chatId), senderName, lastFetchedMessage.content);
                    setLastMessage(lastFetchedMessage._id);
                }
            }, 4500);
        }
    };

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
    };

    if (!selectedChat) {
        return <div className="chat-window-empty">Select a chat to start messaging</div>;
    }

    return (
        <div className="chat-window">
            <div className="chat-header">
                <div className="chat-info">
                    <img
                        src="/default-avatar.png"
                        alt={`${selectedChat.firstName} ${selectedChat.lastName}`} className="avatar" />
                    <span>{`${selectedChat.firstName} ${selectedChat.lastName}`}</span>
                </div>
                <div className="kebab-menu">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="kebab-button">
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                    {isMenuOpen && (
                        <div className="kebab-dropdown">
                            <button onClick={() => {
                                onUpdateChat(selectedChat);
                                setIsMenuOpen(false);
                            }}>Update
                            </button>
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="chat-messages">
                {messages.map(message => (
                    <div key={message._id} className={`message-wrapper ${message.sender}`}>
                        {message.sender === 'bot' && (
                            <img
                                src="/default-avatar.png"
                                alt={`${selectedChat.firstName} ${selectedChat.lastName}`}
                                className="avatar"
                            />
                        )}
                        <div className={`message-content ${message.sender}`}>
                            <div className={`message ${message.sender}`}>
                                {message.content}
                            </div>
                            <div className="message-time">
                                {formatDate(new Date(message.createdAt))}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <MessageInput onSendMessage={handleSendMessage} />
            {isDeleteConfirmOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Confirm Deletion</h2>
                        <button className="material-symbols-outlined" type="button" onClick={() => setIsDeleteConfirmOpen(false)}>close</button>
                        <p>Are you sure you want to delete this chat?</p>
                        <div className="modal-actions">
                            <button onClick={confirmDelete}>Yes, delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;