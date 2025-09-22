export interface Suscription {
    id: number;
    user_id: number;
    plan: 'basic' | 'premium';
    status: 'active' | 'inactive';
    start_date: Date;
    end_date: Date;
}