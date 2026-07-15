import { NextFunction, Request, Response } from "express";
import { AuthService } from "./authService";
import { sendSuccess } from "../../utils/apiResponse";

export class AuthController {
    constructor(private authService: AuthService) { }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.authService.register(req.body);
            sendSuccess(res, "User registered successfully", result, 201);
        } catch (err) {
            next(err);
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.authService.login(req.body);
            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            sendSuccess(res, "LogIn Successfully", {
                user: result.user,
                accessToken: result.accessToken,
            }, 200);
        } catch (err) {
            next(err);
        }
    }

}