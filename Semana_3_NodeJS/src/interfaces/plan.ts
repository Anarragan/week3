export interface Plan {
    id: number;
    name: 'basic' | 'premium';
    price: number;
    max_books_per_month: number;
    description: string;
}