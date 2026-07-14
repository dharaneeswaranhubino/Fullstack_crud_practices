import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export const errorHandlingMiddleware = (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    const statusCode = err instanceof ApiError ? err.statusCode : 500;
    res.status(statusCode).json(
        {
            success: false,
            message: err.message || "Internal server error",
            stack: process.env.NODE_ENV === "production" ? null : err.stack
        }
    );
}