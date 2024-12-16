export interface Vehicle {
  vehicleid: number; // Primary key
  ownerid: number; // Foreign key referencing users table
  licenseplate: string; // Unique license plate number
  brand?: string; // Vehicle brand (optional)
  model?: string; // Vehicle model (optional)
  year?: number; // Year of manufacture (optional)
  registrationdate: Date; // Date of registration
  status?: 'Active' | 'Expired' | 'Pending'; // Status of the vehicle (optional)
  createdat?: Date; // Timestamp of creation (optional)
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
