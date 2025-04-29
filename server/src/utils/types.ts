import { Request } from "express";

export interface CustomRequest extends Request {
    userId?: string;
}

export interface jwtPayload {
    _id?: string;
    iat: number;
    exp: number;
}