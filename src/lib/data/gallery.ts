import photos from "@/mock/photos.json";
import type {
  GalleryPhoto,
  PhotosFile,
  TimelinePhoto,
} from "@/types/gallery";

const TIMELINE_COUNT = 13;

const photosFile = photos as PhotosFile;

export function getTimelinePhotos(): TimelinePhoto[] {
  return photosFile.timeline
    .slice()
    .sort((a, b) => a.month - b.month)
    .slice(0, TIMELINE_COUNT);
}

export function getGalleryPhotos(): GalleryPhoto[] {
  return photosFile.gallery.slice();
}
