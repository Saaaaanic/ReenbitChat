import React from 'react';

interface Chat {
    _id: string;
    firstName: string;
    lastName: string;
}

interface ChatListProps {
    chats: Chat[];
    onSelectChat: (chat: Chat) => void;
    onCreateChat: () => void;
    onUpdateChat: (chat: Chat) => void;
    onDeleteChat: (chat: Chat) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat, onCreateChat, onUpdateChat, onDeleteChat }) => {
    return (
        <div className="chat-list">
            <h2>Chats</h2>
            <button onClick={onCreateChat}>New Chat</button>
            <ul>
                {chats.map((chat) => (
                    <li key={chat._id}>
                        <div onClick={() => onSelectChat(chat)}>
                            {chat.firstName} {chat.lastName}
                        </div>
                        <button onClick={() => onUpdateChat(chat)}>Update</button>
                        <button onClick={() => onDeleteChat(chat)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;