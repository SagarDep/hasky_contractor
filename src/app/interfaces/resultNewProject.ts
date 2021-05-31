export interface Projects{
  type: string;
  message: string;
  data: Data[];
}

export interface Data {
  name: string;
  consecutive: number;
  address: string;
  supervisor_name: string;
  supervisor_phone: string;
  description: string;
  break_time: string;
  paid_break_time: string;
  overtime: string;
  user_id: string;
  updated_at: string;
  created_at: string;
  id: number;
}