import React, { useState } from 'react';
import ChatModal from "./ChatModal";

interface UpdateChatDialogProps {
    chat: { _id: string; firstName: string; lastName: string };
    isOpen: boolean;
    onClose: () => void;
    onUpdateChat: (id: string, firstName: string, lastName: string) => void;
}

const UpdateChatDialog: React.FC<UpdateChatDialogProps> = ({ chat, isOpen, onClose, onUpdateChat }) => {
    const [firstName, setFirstName] = useState(chat.firstName);
    const [lastName, setLastName] = useState(chat.lastName);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (firstName && lastName) {
            onUpdateChat(chat._id, firstName, lastName);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <ChatModal
            title="Update Chat"
            buttonText="Update"
            firstName={firstName}
            lastName={lastName}
            onClose={onClose}
            handleSubmit={handleSubmit}
            setFirstName={setFirstName}
            setLastName={setLastName}
        />
    );
};

export default UpdateChatDialog;