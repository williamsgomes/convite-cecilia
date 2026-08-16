export type RsvpStatus = "confirmed" | "declined";

export type SubmitRsvpInput = {
  name: string;
  childrenCount: number;
  status: RsvpStatus;
};

export type Rsvp = {
  id: string;
  eventId: string;
  name: string;
  status: RsvpStatus;
  childrenCount: number;
  createdAt: string;
};
