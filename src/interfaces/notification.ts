export interface Notification {
    id: number;
    user_id: number;
    type: 'info' | 'warning' | 'error';
    message: string;
    read: boolean;
    created_at: Date;
}