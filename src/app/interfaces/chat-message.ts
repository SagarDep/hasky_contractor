export interface ChatMessageType {
  text: string;
  file: string;
  senderUid: string;
  senderName: string;
  receiverUid: string;
  chatId: string;
  createdAt: number;
}

export const DEFAULT_MESSAGE: ChatMessageType = {
  text: '',
  file: '',
  senderName: '',
  senderUid: '',
  receiverUid: '',
  chatId: '',
  createdAt: Date.now()
};
