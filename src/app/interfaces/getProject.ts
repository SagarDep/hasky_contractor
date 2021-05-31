export interface GetProject {
  type: string;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  name: string;
  consecutive: string;
  address: string;
  supervisor_name: string;
  supervisor_phone: string;
  description: string;
  break_time: Breaktime;
  paid_break_time: Breaktime;
  overtime: string;
  user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  user: User;
  request_worker: any[];
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  type: string;
  phone_number: string;
  profile_image: string;
  address: string;
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
  working_days?: any;
  onesingnal_id?: any;
  location: Location;
}

interface Location {
  type: string;
  coordinates: number[];
}

interface Breaktime {
  id: number;
  description: string;
  number: string;
  worker_visible: string;
  contractor_visible: string;
  created_at: string;
  updated_at: string;
}