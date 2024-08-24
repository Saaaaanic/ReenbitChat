import React, { useState, useEffect } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import CreateChatDialog from './components/CreateChatDialog';
import {getChats, createChat, updateChat, deleteChat} from './services/Api';
import './styles/App.css';
import UpdateChatDialog from './components/UpdateChatDialog';
import {Chat} from "./interfaces/IChat";

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
        console.log(fetchedChats);
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
            <div className="sidebar">
                <div className="menu">
                    <div className="user-profile">
                        <img src="/default-avatar.png" alt="User" className="avatar"/>
                        <button className="log-in-button">Log in</button>
                    </div>
                    <div className="search-bar">
                        <input type="text"
                               placeholder="Search chat..."
                               value={searchTerm}
                               onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={() => setIsCreateDialogOpen(true)} type="submit">+</button>
                    </div>
                </div>
                <ChatList
                    chats={filteredChats}
                    onSelectChat={setSelectedChat}
                    onUpdateChat={(chat) => {
                        setSelectedChatForUpdate(chat);
                        setIsUpdateDialogOpen(true);
                    }}
                    onDeleteChat={handleDeleteChat}
                />
            </div>
            <ChatWindow selectedChat={selectedChat}/>
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