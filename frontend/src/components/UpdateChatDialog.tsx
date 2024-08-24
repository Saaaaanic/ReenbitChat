import React, { useState } from 'react';

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
        <div className="update-chat-dialog">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <button type="submit">Update Chat</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default UpdateChatDialog;