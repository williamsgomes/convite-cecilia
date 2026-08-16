import photos from "./photos.json";
import type { PhotosFile } from "@/types/gallery";

export const photosFile = photos as PhotosFile;
export const timelinePhotos = photosFile.timeline;
export const galleryPhotos = photosFile.gallery;
