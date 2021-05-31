export interface Update_project {
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
  break_time: string;
  paid_break_time: string;
  overtime: string;
  user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}