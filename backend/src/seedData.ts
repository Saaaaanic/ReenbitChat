import Chat from './models/Chat';

export const seedPredefinedChats = async () => {
    const predefinedChats = [
        { firstName: 'John', lastName: 'Doe' },
        { firstName: 'Jane', lastName: 'Smith' },
        { firstName: 'Alice', lastName: 'Johnson' },
    ];

    for (const chatData of predefinedChats) {
        const existingChat = await Chat.findOne(chatData);
        if (!existingChat) {
            await Chat.create(chatData);
        }
    }

    console.log('Predefined chats seeded successfully');
};