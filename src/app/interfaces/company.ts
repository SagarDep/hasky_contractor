export interface Company {
  type: string;
  message: string;
  data: Data;
}

export interface Data {
  name: string;
  user_id: string;
  description: string;
  image: string;
  updated_at: string;
  created_at: string;
  id: number;
}