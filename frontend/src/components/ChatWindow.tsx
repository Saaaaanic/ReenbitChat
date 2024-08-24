import React, { useState, useEffect } from 'react';
import { getMessages, sendMessage } from '../services/Api';
import MessageInput from './MessageInput';
import Toast from './Toast';

interface Message {
    _id: string;
    content: string;
    sender: 'user' | 'bot';
    createdAt: string;
}

interface ChatWindowProps {
    selectedChat: { _id: string; firstName: string; lastName: string } | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedChat }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        if (selectedChat) {
            fetchMessages();
        }
    }, [selectedChat]);

    useEffect(() => {
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.sender === 'bot') {
                setToast(`New message: ${lastMessage.content}`);
            }
        }
    }, [messages]);

    const fetchMessages = async () => {
        if (selectedChat) {
            const fetchedMessages = await getMessages(selectedChat._id);
            setMessages(fetchedMessages);
        }
    };

    const handleSendMessage = async (content: string) => {
        if (selectedChat) {
            const newMessage = await sendMessage(selectedChat._id, content);
            setMessages(prevMessages => [...prevMessages, newMessage]);

            setTimeout(() => {
                fetchMessages();
            }, 3500);
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleString('en-US', { timeZone: 'UTC' });
    };

    if (!selectedChat) {
        return <div className="chat-window-empty">Select a chat to start messaging</div>;
    }

    return (
        <div className="chat-window">
            <div className="chat-header">
                <img
                    src="/default-avatar.png"
                    alt={`${selectedChat.firstName} ${selectedChat.lastName}`} className="avatar"/>
                <span>{`${selectedChat.firstName} ${selectedChat.lastName}`}</span>
            </div>
            <div className="chat-messages">
                {messages.map(message => (
                    <div className="message-wrapper">
                        <div key={message._id} className={`message ${message.sender}`}>
                            {message.content}
                        </div>
                        <div className="message-time" style={{color: 'grey', fontSize: '0.8em'}}>
                            {formatDate(new Date(message.createdAt))}
                        </div>
                    </div>
                ))}
            </div>
            <MessageInput onSendMessage={handleSendMessage}/>
            {toast && (
                <Toast
                    message={toast}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default ChatWindow;