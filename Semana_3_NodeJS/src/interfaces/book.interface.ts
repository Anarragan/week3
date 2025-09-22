export interface IBook {
    id: string;
    title: string;
    author: string;
    isbn: string;
    genere: string;
    language: string;
    cover_url: string;
    description: string;
    owner_id: string;
    created_at: string;
    book_copies?: number;
}

export interface IBookUpdate {
    title?: string;
    author?: string;
    isbn?: string;
    genere?: string;
    language?: string;
    cover_url?: string;
    description?: string;
    owner_id?: string;
    book_copies?: number;    
}
