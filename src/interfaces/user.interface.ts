export interface IUser {
    id: string;
    name: string;
    last_name: string;
    email: string;
    password_hash: string;
    phone: string;
    adress: string;
    role: 'user' | 'admin';
    created_at: Date; 
    updated_at?: Date; 
}