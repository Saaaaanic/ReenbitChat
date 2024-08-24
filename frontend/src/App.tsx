import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
    const [message, setMessage] = useState('');
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/')
            .then(response => setMessage(response.data))
            .catch(error => console.error('There was an error!', error));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post('http://localhost:5000/message', { text: inputText })
            .then(response => setMessage(response.data.text))
            .catch(error => console.error('There was an error!', error));
    };

    return (
        <div>
            <h1>Express + MongoDB + React TypeScript App</h1>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter a message"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default App;
