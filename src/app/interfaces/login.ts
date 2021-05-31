export interface token {
  access_token: string;
  user: User;
  token_type: string;
  expires_at: string;
}

export interface User {
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
  created_at: string;
  updated_at: string; 
}
