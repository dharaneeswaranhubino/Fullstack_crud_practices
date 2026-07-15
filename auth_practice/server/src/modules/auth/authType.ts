export interface AuthTokenPayload {
    id: number;
    email: string;
    roleId: number;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthLoginResponse {
    user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        roleId: number;
    };
    accessToken: string;
    refreshToken: string;
}