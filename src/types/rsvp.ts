export type RsvpStatus = "confirmed" | "declined";

export type Rsvp = {
  id: string;
  eventId: string;
  name: string;
  phone: string;
  status: RsvpStatus;
  guests: number;
  createdAt: string;
};
