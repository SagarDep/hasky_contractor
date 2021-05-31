export interface SignUp {
  access_token: string;
  user: User;
  token_type: string;
  expires_at: string;
}

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  type: string;
  code: number;
  active: number;
  steps: number;
  updated_at: string;
  created_at: string;
  id: number;
  roles: any[];
}