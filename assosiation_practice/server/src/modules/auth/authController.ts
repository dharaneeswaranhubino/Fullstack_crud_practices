import { NextFunction, Request, Response } from "express";
import { AuthService } from "./authService";
import { sendSuccess } from "../../utils/apiResponse";
import { ApiError } from "../../utils/ApiError";

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

    refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.refreshToken;
            if (!token) {
                throw new ApiError("Refresh token not found", 401)
            }

            const result = await this.authService.refreshToken(token);

            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            sendSuccess(res, "token refreshed successfully", { accessToken: result.accessToken }, 200);

        } catch (err) {
            next(err);
        }
    }

    logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.refreshToken;
            if (!token) {
                throw new ApiError("Refresh token not Found", 401);
            }
            await this.authService.logout(token);

            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            })

            sendSuccess(res, "LogOut successfully", null, 200);
        } catch (err) {
            next(err)
        }
    }

}