import { User } from "../models/user.model";

export interface ChatMessage{
    senderId?: string;
    userName:string;
    content: string;
    createdAt?:Date;
}

export interface oldChatResponse{
     sender: User;
    userName:string;
    content: string;
    createdAt?:Date;
}

export interface FormateMessages{
    senderId?:string;
   userName?:string;
   content: string;
   sentByUser?:boolean
}
