import type { Message } from "@/types/message";
import type { Rsvp, RsvpStatus } from "@/types/rsvp";

export type MessageRow = {
  id: string;
  event_id: string;
  name: string;
  message: string;
  created_at: string;
};

export type RsvpRow = {
  id: string;
  event_id: string;
  name: string;
  status: RsvpStatus;
  adults_count: number;
  children_count: number;
  created_at: string;
};

export function mapMessage(row: MessageRow): Message {
  return {
    id: row.id,
    eventId: row.event_id,
    name: row.name,
    message: row.message,
    approved: true,
    createdAt: row.created_at,
  };
}

export function mapRsvp(row: RsvpRow): Rsvp {
  return {
    id: row.id,
    eventId: row.event_id,
    name: row.name,
    status: row.status,
    adultsCount: row.adults_count ?? 0,
    childrenCount: row.children_count ?? 0,
    createdAt: row.created_at,
  };
}
