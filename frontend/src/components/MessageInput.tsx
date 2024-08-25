import React, { useState } from 'react';

interface MessageInputProps {
    onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <form className="message-input" onSubmit={handleSubmit}>
            <div className="message-input-wrapper">
                <input
                    type="text"
                    placeholder="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">
                    <span className="material-symbols-outlined">send</span>
                </button>
            </div>
        </form>
    );
};

export default MessageInput;