export type SubmitMessageInput = {
  name: string;
  message: string;
};

export type Message = {
  id: string;
  eventId: string;
  name: string;
  message: string;
  approved: boolean;
  createdAt: string;
};
