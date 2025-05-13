import { Request } from "express";

export interface CustomRequest extends Request {
    userId?: string;
}

export interface jwtPayload {
    _id?: string;
    iat: number;
    exp: number;
}

export interface NotificationData {
    _id: string;
    title: string;
    description: string;
    group: string;
    expense: string;
    amount: number;
    paidBy: {
        _id: string;
        userName: string;
    };
}