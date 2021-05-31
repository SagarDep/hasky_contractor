export interface User {
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
  documents: any[];
  company: Company;
  projects: Project[];
  trades: any[];
  tools: any[];
  cv: string;
  payment_add: string;
}

export interface Project {
  id: number;
  name: string;
  consecutive: string;
  address: string;
  supervisor_name: string;
  supervisor_phone: string;
  description: string;
  break_time: string;
  paid_break_time: string;
  overtime: string;
  user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Company {
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