export interface Notifiacions {
    type: string;
    message: string;
    data: notifications[];
  }
  
  export interface notifications {
    id: string;
    type: string;
    notifiable_type: string;
    notifiable_id: string;
    data: Data;
    read_at: string;
    created_at: string;
    updated_at: string;
  }
  
  interface Data {
    title: string;
    data: string;
    request_id: number | string;
  }