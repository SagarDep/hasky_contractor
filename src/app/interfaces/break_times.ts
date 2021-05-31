export interface Break {
  type: string;
  message: string;
  data: Datum[];
}

export interface Datum {
  id: number;
  description: string;
  number: string;
  worker_visible: string;
  contractor_visible: string;
  created_at: string;
  updated_at: string; 
}