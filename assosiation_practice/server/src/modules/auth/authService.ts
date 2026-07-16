import bcrypt from "bcryptjs";
import { UserRepository } from "../user/userRepository";
import { LoginInput, RegisterInput } from "./authValidation";
import { ApiError } from "../../utils/ApiError";
import { AuthLoginResponse, AuthTokenPayload, AuthTokens } from "./authType";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { redisClient } from "../../config/redis";
import { RoleRepository } from "../role/roleRepository";

export class AuthService {
    // private userRepository: UserRepository;

    // constructor(userRepository: UserRepository) {
    //     this.userRepository = userRepository;
    // }
    //In shortcut we wrote like this below in single line
    constructor(private userRepository: UserRepository, private roleRepository: RoleRepository) { }

    private generateToken(payload: AuthTokenPayload): AuthTokens {
        const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m",
        });

        const refreshToken = jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
            expiresIn: "7d",
        });

        return { accessToken, refreshToken };
    }

    async register(data: RegisterInput) {
        const existing = await this.userRepository.findByEmail(data.email);
        if (existing) {
            throw new ApiError("Email already registered", 409);
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.userRepository.create({
            ...data,
            password: hashedPassword,
        });

        const userRole = await this.roleRepository.findByName("user");
        if (!userRole) {
            throw new ApiError("Default role not found", 500)
        }

        await this.userRepository.assignRole(user.id, userRole.id);

        const { password, ...safeUser } = user.toJSON();
        // return safeUser;
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            isVerified: user.isVerified,
            isActive: user.isActive,
            createdAt: user.createdAt,
        }
    }

    async login(data: LoginInput): Promise<AuthLoginResponse> {
        const user = await this.userRepository.findByEmailWithRole(data.email);
        if (!user) {
            throw new ApiError("Invalid credential", 401);
        }

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            throw new ApiError("Invalid credential", 401);
        }

        const roles = (user.Roles ?? []).map((r: any) => r.name);

        const payload: AuthTokenPayload = {
            id: user.id,
            email: user.email,
            roles,
        }

        const { accessToken, refreshToken } = this.generateToken(payload);

        await redisClient.set(
            `refreshToken:${user.id}`,
            refreshToken,
            { EX: 7 * 24 * 60 * 60 }
        );

        return {
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                roles,
            },
            accessToken,
            refreshToken,
        }
    }

    async refreshToken(token: string): Promise<{ accessToken: string, refreshToken: string }> {
        const decodeToken = jwt.verify(token, env.REFRESH_TOKEN_SECRET) as AuthTokenPayload;

        const storedToken = await redisClient.get(`refreshToken:${decodeToken.id}`);
        if (!storedToken || storedToken !== token) {
            throw new ApiError("Invalid or expire the refresh token", 401);
        };

        await redisClient.del(`refreshToken:${decodeToken.id}`);

        const payload: AuthTokenPayload = {
            id: decodeToken.id,
            email: decodeToken.email,
            roles: decodeToken.roles,
        }

        const { accessToken, refreshToken } = await this.generateToken(payload);

        await redisClient.set(
            `refreshToken:${decodeToken.id}`,
            refreshToken,
            { EX: 7 * 24 * 60 * 60 }
        )

        return { accessToken, refreshToken };

    }

    async logout(token: string): Promise<void> {
        const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET) as AuthTokenPayload;

        await redisClient.del(`refreshToken:${decoded.id}`);
    }
}

