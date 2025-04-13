import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../services/auth.services";
import { findUserById } from "../services/user.services";
import { RequestWithUser } from "../types/user.types";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // check authorization token format
        if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Please authenticate" });
            return;
        }

        // extract token from authorization header
        const tokenStartIndex = 7;
        const token = req.headers.authorization.substring(tokenStartIndex);

        // verify token
        const payload = verifyToken(token);
        
        // find user using id
        const user = await findUserById(payload.id);
        if(!user) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Please authenticate" });
            return;
        }

        // attach user to request object
        (req as RequestWithUser).user = user;
        next();
    } catch (error) {
        console.log("Token authentication failed", error);

        // return 401 response if authentication fails
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "Please authenticate" });
    }
}
