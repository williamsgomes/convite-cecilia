import { getEvent } from "@/lib/data/events";
import { getGalleryPhotos, getTimelinePhotos } from "@/lib/data/gallery";
import { getApprovedMessages } from "@/lib/data/messages";
import type { Event } from "@/types/event";
import type { GalleryPhoto, TimelinePhoto } from "@/types/gallery";
import type { Message } from "@/types/message";

export type InvitationData = {
  event: Event;
  messages: Message[];
  timeline: TimelinePhoto[];
  gallery: GalleryPhoto[];
};

export async function getInvitationData(): Promise<InvitationData> {
  const [event, messages, timeline, gallery] = await Promise.all([
    Promise.resolve(getEvent()),
    getApprovedMessages(),
    Promise.resolve(getTimelinePhotos()),
    Promise.resolve(getGalleryPhotos()),
  ]);

  return {
    event,
    messages,
    timeline,
    gallery,
  };
}
