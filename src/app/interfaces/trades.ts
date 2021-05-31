export interface Trades {
  type: string;
  message: string;
  data: Datum[];
}

export interface Datum {
  id: number;
  name: string;
  description: string;
  image: string;
  worker_visible: string;
  contractor_visible: string;
  created_at: string;
  updated_at: string;
  specialty: Specialty[];
}

export interface Specialty {
  id: number;
  name: string;
  trade_id: string;
  created_at: string;
  updated_at: string;
}