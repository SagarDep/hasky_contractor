export interface Projectss {
  type: string;
  message: string;
  data: Datum[];
}

export interface Datum {
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
  typeProject: string;
  created_at: string;
  updated_at: string;

}