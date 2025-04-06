import { Request } from "express";

export interface User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string | null;
    socketId: string | null;
}

export interface RequestWithUser extends Request {
    user: User
}