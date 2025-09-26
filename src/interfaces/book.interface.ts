export interface IBook {
    id: number;
    title: string;
    author: string;
    isbn: string;
    genere: string;
    language: string;
    cover_url?: string;
    description: string;
    user_id: number;
    created_at: Date;
    book_copies?: number;
}