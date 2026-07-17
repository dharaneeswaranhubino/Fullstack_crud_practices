export interface UserType {
    fname: string;
    lname: string;
    email: string;
    password: string;
    phone: string;
}

export interface AuthType {
    user:UserType | null;
    loading:boolean
    error:string | null;
}