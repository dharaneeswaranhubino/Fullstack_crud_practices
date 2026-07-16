import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`[Error]: ${err.message}`);

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: process.env.NODE_ENV === "production" ? null : err.message,
        })
    }

    return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === "production" ? null : err.message,
    })

}