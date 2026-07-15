import bcrypt from "bcryptjs";
import { UserRepository } from "../user/userRepository";
import { LoginInput, RegisterInput } from "./authValidation";
import { ApiError } from "../../utils/ApiError";
import { AuthLoginResponse, AuthTokenPayload, AuthTokens } from "./authType";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

export class AuthService {
    // private userRepository: UserRepository;

    // constructor(userRepository: UserRepository) {
    //     this.userRepository = userRepository;
    // }
    //In shortcut we wrote like this below in single line
    constructor(private userRepository: UserRepository) { }

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
            roleId: 1,
        });

        const { password, ...safeUser } = user.toJSON();
        return safeUser;
    }

    async login(data: LoginInput): Promise<AuthLoginResponse> {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw new ApiError("Invalid credential", 401);
        }

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            throw new ApiError("Invalid credential", 401);
        }

        const payload: AuthTokenPayload = {
            id: user.id,
            email: user.email,
            roleId: user.roleId
        }

        const { accessToken, refreshToken } = this.generateToken(payload);

        return {
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                roleId: user.roleId,
            },
            accessToken,
            refreshToken,
        }
    }
}

