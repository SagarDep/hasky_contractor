export interface ChatUserType {
  uid: string;
  fcmToken: string;
  name: string;
  profileImage: string;
  createdAt: number;
  updatedAt: number;
}

export const DEFAULT_USER: ChatUserType = {
  uid: '',
  fcmToken: '',
  name: '',
  profileImage: '',
  createdAt: Date.now(),
  updatedAt: Date.now()
};
