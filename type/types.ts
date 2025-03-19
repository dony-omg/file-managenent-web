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
export interface Vehicle {
  id: string; // UUID được trả về dưới dạng string
  license_plate: string;
  brand: string | null;
  model: string | null;
  year: number | null;
  color: string | null;
  vin_number: string | null;
  engine_number: string | null;
  chassis_number: string | null;
  registration_date: string | null; // timestamptz được trả về dưới dạng string (ISO 8601)
  expiration_date: string | null; // timestamptz được trả về dưới dạng string (ISO 8601)
  status: string | null;
  owner_id: number;
  created_at: string; // timestamptz được trả về dưới dạng string (ISO 8601)
  updated_at: string; // timestamptz được trả về dưới dạng string (ISO 8601)
}