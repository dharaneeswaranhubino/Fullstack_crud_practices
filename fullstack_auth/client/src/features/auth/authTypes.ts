export interface UserType {
    fname: string;
    lname: string;
    email: string;
    password: string;
    phone: string;
    roles: string[];
}

export interface AuthType {
    users: UserType | null;
    accessToken:string | null;
    loading: boolean
    error: string | null;
}