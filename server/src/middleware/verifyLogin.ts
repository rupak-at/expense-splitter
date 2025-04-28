import { NextFunction, Request, RequestHandler, Response } from "express";
import { verifyJWT } from "../utils/jwt";

export interface CustomRequest extends Request {
    userId?: string;
}

export interface jwtPayload {
    _id?: string;
    iat: number;
    exp: number;
}

export const verifyLogin:RequestHandler = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

        if (!token){
            res.status(401).json({error: "Unauthorized"});
            return;
        }

        const isValid = verifyJWT(token);
        if (!isValid) {
            res.status(401).json({error: "Unauthorized"});
            return;
        }

        req.userId = (isValid as jwtPayload)?._id;
        next();
        return 
        
    } catch (error) {
        console.error(error)
        res.status(500).json({error:(error as Error).message  });
        return
    }
}