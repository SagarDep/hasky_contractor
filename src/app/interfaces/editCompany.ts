export interface EditCompany {
  type: string;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  name: string;
  user_id: string;
  description: string;
  phone_number?: any;
  address?: any;
  email?: any;
  rfc?: any;
  rs?: any;
  image: string;
  created_at: string;
  updated_at: string;
}