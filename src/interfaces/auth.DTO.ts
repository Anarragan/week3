export interface IRegisterDTO {
    name?: string;
    last_name?: string;
    email: string;
    password: string;
    phone?: string;
    adress?: string;
    role: "admin" | "user";
}

export interface ILoginDTO {
    email: string;
    password: string;
}