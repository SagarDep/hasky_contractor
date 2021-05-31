export interface GetWorkersDetails {
  type: string;
  message: string;
  data: Datum[];
}

export interface Datum {
  id: number;
  user_id: string;
  request_id: string;
  project_id: string;
  notification_accepted: string;
  user_accepted: string;
  created_at: string;
  updated_at: string;
  canceled: string;
  user: User;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  type: string;
  phone_number: string;
  profile_image?: string;
  address: string;
  email_verified_at?: any;
  rating?: string;
  confirmed: string;
  active: string;
  steps: string;
  code: string;
  status: string;
  created_at: string;
  updated_at: string;
  transport: string;
  facebook_login: string;
  facebook_token?: any;
  working_days: string;
  onesignal_id?: string;
  location?: Location;
}

interface Location {
  type: string;
  coordinates: number[];
}
