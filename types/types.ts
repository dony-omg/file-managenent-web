export interface Vehicle {
  id: string;
  license_plate: string;
  brand: string | null;
  model: string | null;
  year: number | null;
  color: string | null;
  vin_number: string | null;
  engine_number: string | null;
  chassis_number: string | null;
  registration_date: string | null;
  expiration_date: string | null;
  status: 'active' | 'expired' | 'suspended';
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface VehicleDocument {
  id: string;
  vehicle_id: string;
  document_type: string;
  document_number: string | null;
  issue_date: string | null;
  expiry_date: string | null;
  status: 'active' | 'expired';
  file_url: string | null;
  created_at: string;
  updated_at: string;
}

export type UserRole = 'Editor' | 'Viewer' | 'Admin';

export interface UserWithRole {
  id: string; // UUID từ auth.users
  email: string;
  role: UserRole | null;
  status: 'Active' | 'Pending' | 'Inactive';
  last_sign_in_at: string | null;
  raw_user_meta_data: {
    full_name?: string;
  };
}