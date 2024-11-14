export interface Vehicle {
    vehicle_id: number;
    registration_number: string;
    vehicle_type: string;
    brand: string;
    color?: string;
    year_of_manufacture: number;
    owner_id: number;
    created_at?: string;
}

export interface User {
    user_id: number;
    username: string;
    email: string;
    role: 'admin' | 'employee' | 'owner';
    created_at?: string;
    last_login?: string;
}

export interface Document {
    document_id: number;
    vehicle_id: number;
    document_type: string;
    file_path: string;
    uploaded_at: string;
}
