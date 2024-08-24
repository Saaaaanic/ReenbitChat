import {Message} from "./IMessage";

export interface Chat {
    _id: string;
    firstName: string;
    lastName: string;
    lastMessage: Message;
}