import { gallery } from "@/mock/gallery";
import type { GalleryItem } from "@/types/gallery";

export function getGallery(): GalleryItem[] {
  return gallery
    .filter((item) => item.published)
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
