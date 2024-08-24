import Chat from './models/Chat';

export const seedPredefinedChats = async () => {
    const existingChatsCount = await Chat.countDocuments();

    if (existingChatsCount === 0) {
        const predefinedChats = [
            { firstName: 'John', lastName: 'Doe' },
            { firstName: 'Jane', lastName: 'Smith' },
            { firstName: 'Alice', lastName: 'Johnson' },
        ];

        await Chat.insertMany(predefinedChats);
        console.log('Predefined chats seeded successfully');
    } else {
        console.log('Chats already exist, skipping seeding predefined chats');
    }
};
