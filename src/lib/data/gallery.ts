import { photosFile } from "@/mock/gallery";
import type { GalleryPhoto, TimelinePhoto } from "@/types/gallery";

const TIMELINE_COUNT = 13;

export function getTimelinePhotos(): TimelinePhoto[] {
  return photosFile.timeline
    .slice()
    .sort((a, b) => a.month - b.month)
    .slice(0, TIMELINE_COUNT);
}

export function getGalleryPhotos(): GalleryPhoto[] {
  return photosFile.gallery.slice();
}
