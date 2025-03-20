// Định nghĩa type cho bảng users
export interface User {
  user_id: number;
  fullname: string | null;
  email: string | null;
  phone: string | null;
  addr: string | null;
  usertype: string | null;
  created_at: string; // timestamptz được trả về dưới dạng string (ISO 8601)
}

// Định nghĩa type cho bảng tags
export interface Tag {
  tag_id: number;
  user_id: number;
  action: string | null;
  timestamp: string; // timestamptz được trả về dưới dạng string (ISO 8601)
}

// Định nghĩa type cho bảng vehicles
// lib/types.ts
export interface Vehicle {
  id: string;
  license_plate: string;
  brand: string;
  model: string;
  year: number;
  color: string | null;
  vin_number: string;
  engine_number: string | null;
  chassis_number: string | null;
  registration_date: string | null;
  expiration_date: string | null;
  status: string | null;
  owner_id: string;
  created_at: string;
  updated_at: string;
  fuel_type: string | null; // Thêm cột mới
  owner_name: string | null; // Thêm cột mới
  owner_contact: string | null; // Thêm cột mới
}