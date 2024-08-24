import React, { useState, useEffect } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import CreateChatDialog from './components/CreateChatDialog';
import {getChats, createChat, updateChat, deleteChat} from './services/Api';
import './styles/App.css';
import UpdateChatDialog from './components/UpdateChatDialog';

interface Chat {
    _id: string;
    firstName: string;
    lastName: string;
}

const App: React.FC = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const [selectedChatForUpdate, setSelectedChatForUpdate] = useState<Chat | null>(null);

    useEffect(() => {
        fetchChats();
    }, []);

    useEffect(() => {
        const filtered = chats.filter((chat) => {
            const fullName = `${chat.firstName} ${chat.lastName}`.toLowerCase();
            const searchLower = searchTerm.toLowerCase();
            return (
                fullName.includes(searchLower) ||
                chat.firstName.toLowerCase().includes(searchLower) ||
                chat.lastName.toLowerCase().includes(searchLower)
            );
        });
        setFilteredChats(filtered);
    }, [chats, searchTerm]);

    const fetchChats = async () => {
        const fetchedChats = await getChats();
        setChats(fetchedChats);
    };

    const handleCreateChat = async (firstName: string, lastName: string) => {
        await createChat(firstName, lastName);
        fetchChats();
        setIsCreateDialogOpen(false);
    };

    const handleUpdateChat = async (id: string, firstName: string, lastName: string) => {
        await updateChat(id, firstName, lastName);
        fetchChats();
        setIsUpdateDialogOpen(false);
    };

    const handleDeleteChat = async (chat: Chat) => {
        await deleteChat(chat._id);
        fetchChats();
    };

    return (
        <div className="app">
            <input
                type="text"
                placeholder="Search chats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ChatList
                chats={filteredChats}
                onSelectChat={setSelectedChat}
                onCreateChat={() => setIsCreateDialogOpen(true)}
                onUpdateChat={(chat) => {
                    setSelectedChatForUpdate(chat);
                    setIsUpdateDialogOpen(true);
                }}
                onDeleteChat={handleDeleteChat}
            />
            <ChatWindow selectedChat={selectedChat} />
            <CreateChatDialog
                isOpen={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onCreateChat={handleCreateChat}
            />
            {selectedChatForUpdate && (
                <UpdateChatDialog
                    chat={selectedChatForUpdate}
                    isOpen={isUpdateDialogOpen}
                    onClose={() => setIsUpdateDialogOpen(false)}
                    onUpdateChat={handleUpdateChat}
                />
            )}
        </div>
    );
};

export default App;