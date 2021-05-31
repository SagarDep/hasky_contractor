export interface DetailRequest {
  type: string;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  trade_id: string;
  experience: string;
  quantity_workers: string;
  start_date: string;
  end_date: string;
  weekdays: string;
  start_time: string;
  end_time: string;
  project_id: string;
  task: string;
  status: string;
  is_deleted: string;
  created_at: string;
  updated_at: string;
  cost: string;
  users: User2[];
  project: Project;
  trade: Trade2;
}

interface Trade2 {
  id: number;
  name: string;
  description: string;
  image: string;
  worker_visible: string;
  contractor_visible: string;
  created_at: string;
  updated_at: string;
}

interface Project {
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

export interface User2 {
  id: number;
  user_id: string;
  request_id: string;
  project_id: string;
  notification_accepted: string;
  user_accepted: string;
  created_at: string;
  updated_at: string;
  canceled: string;
  user: UserWorker;
}

export interface UserWorker {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  type: string;
  phone_number: string;
  profile_image?: any;
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
  transport: string;
  facebook_login: string;
  facebook_token?: any;
  working_days: string;
  onesingnal_id?: any;
  location?: any;
  trades: Trade[];
  tools: Tool[];
}

export interface Tool {
  id: number;
  description: string;
  worker_visible: string;
  contractor_visible: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot2;
}

interface Pivot2 {
  user_id: string;
  tool_id: string;
}

export interface Trade {
  id: number;
  name: string;
  description: string;
  image: string;
  worker_visible: string;
  contractor_visible: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

interface Pivot {
  user_id: string;
  trade_id: string;
  overtime: string;
  specialty_id: string;
}