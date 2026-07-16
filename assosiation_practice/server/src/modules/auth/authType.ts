export interface AuthTokenPayload {
    id: number;
    email: string;
    roles: string[];
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthUserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
}

export interface AuthLoginResponse {
    user: AuthUserResponse;
    accessToken: string;
    refreshToken: string;
}