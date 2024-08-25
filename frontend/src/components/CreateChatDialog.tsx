import React, { useState } from 'react';
import ChatModal from "./ChatModal";

interface CreateChatDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateChat: (firstName: string, lastName: string) => void;
}

const CreateChatDialog: React.FC<CreateChatDialogProps> = ({ isOpen, onClose, onCreateChat }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (firstName && lastName) {
            onCreateChat(firstName, lastName);
            setFirstName('');
            setLastName('');
        }
    };

    if (!isOpen) return null;

    return (
        <ChatModal
            title="Create Chat"
            buttonText="Create"
            firstName={firstName}
            lastName={lastName}
            onClose={onClose}
            handleSubmit={handleSubmit}
            setFirstName={setFirstName}
            setLastName={setLastName}
        />
    );
};

export default CreateChatDialog;