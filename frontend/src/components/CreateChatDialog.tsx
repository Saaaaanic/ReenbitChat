import React, { useState } from 'react';

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
        <div className="create-chat-dialog">
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
                <button type="submit">Create Chat</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default CreateChatDialog;