export interface Review {
    id: number;
    book_id: number;
    reviewer_id: number;
    rating: number;
    comment: string;
    created_at: Date;
}