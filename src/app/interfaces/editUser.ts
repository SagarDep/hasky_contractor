export interface editUser {
  type: string;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  type: string;
  phone_number: string;
  profile_image?: any;
  address?: any;
  email_verified_at?: any;
  rating?: any;
  confirmed: string;
  active: string;
  steps: string;
  code: string;
  status: string;
  created_at: string;
  updated_at: string;
  transport?: any;
  facebook_login: string;
  facebook_token?: any;
  location?: any;
  working_days?: any;
}