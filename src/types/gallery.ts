export type TimelinePhoto = {
  id: string;
  month: number;
  label: string;
  src: string;
  alt: string;
};

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
};

export type PhotosFile = {
  timeline: TimelinePhoto[];
  gallery: GalleryPhoto[];
};

export type LightboxPhoto = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
};
