export type RsvpStatus = "confirmed" | "declined";

export type SubmitRsvpInput = {
  name: string;
  adultsCount: number;
  childrenCount: number;
  status: RsvpStatus;
};

export type Rsvp = {
  id: string;
  eventId: string;
  name: string;
  status: RsvpStatus;
  adultsCount: number;
  childrenCount: number;
  createdAt: string;
};
