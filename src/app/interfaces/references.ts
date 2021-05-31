export interface References {
    type: string;
    message: string;
    data: Data;
  }
  
  interface Data {
    user_id: string;
    last_company: string;
    manager_name: string;
    manager_position: string;
    manager_phone: string;
    position_finish: string;
    updated_at: string;
    created_at: string;
    id: number;
  }