export interface getCompany {
  type: string;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  name: string;
  user_id: string;
  description: string;
  phone_number: string;
  address: string;
  email: string;
  rfc: string;
  rs: string;
  image: string;
  created_at: string;
  updated_at: string;
}