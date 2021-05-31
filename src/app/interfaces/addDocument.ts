export interface Document {
  type: string;
  message: string;
  data: Data;
}

interface Data {
  document: string;
  user_id: string;
  updated_at: string;
  created_at: string;
  id: number;
}