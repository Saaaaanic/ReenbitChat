import React from 'react';
import {Chat} from "../interfaces/IChat";

interface ChatListProps {
    chats: Chat[];
    onSelectChat: (chat: Chat) => void;
    onUpdateChat: (chat: Chat) => void;
    onDeleteChat: (chat: Chat) => void;
}

const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return date.toLocaleDateString("EN-en", options);
};

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat, onUpdateChat, onDeleteChat }) => {
    return (
        <div className="chat-list">
            <span className="chat-label">Chats</span>
            {chats.map(chat => {

                return (
                    <div key={chat._id} className="chat-item" onClick={() => onSelectChat(chat)}>
                        <img src="/default-avatar.png"
                             alt={`${chat.firstName} ${chat.lastName}`} className="avatar"/>
                        <div className="chat-item-info">
                            <div className="chat-item-name">{`${chat.firstName} ${chat.lastName}`}</div>
                            {chat.lastMessage && (
                                <div className="chat-item-preview">
                                    {chat.lastMessage.content.length > 30
                                        ? `${chat.lastMessage.content.substring(0, 30)}...`
                                        : chat.lastMessage.content}
                                </div>
                            )}
                        </div>
                        {chat.lastMessage && (
                            <div className="chat-item-date">
                            {formatDate(new Date(chat.lastMessage.createdAt))}
                            </div>
                        )}
                        <button onClick={() => { onUpdateChat(chat); }}>Update</button>
                        <button onClick={() => { onDeleteChat(chat); }}>Delete</button>
                    </div>
                );
            })}
        </div>
    );
};

export default ChatList;