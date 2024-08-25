import React from 'react';

interface ChatModalProps {
    title: string;
    buttonText: string;
    firstName: string;
    lastName: string;
    onClose: () => void;
    handleSubmit: (e: React.FormEvent) => void;
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
}

const ChatModal: React.FC<ChatModalProps> = ({
                                                 title,
                                                 buttonText,
                                                 firstName,
                                                 lastName,
                                                 onClose,
                                                 handleSubmit,
                                                 setFirstName,
                                                 setLastName,
                                             }) => (
    <div className="modal-overlay">
        <div className="modal-content">
            <h2>{title}</h2>
            <button className="material-symbols-outlined" type="button" onClick={onClose}>close</button>
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
                <div className="modal-actions">
                    <button type="submit">{buttonText}</button>
                </div>
            </form>
        </div>
    </div>
);

export default ChatModal;
