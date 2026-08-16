"use client";

import { Heart } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { DecorImage } from "@/components/decorations/DecorImage";
import { invitationSectionClass } from "@/components/invitation/section-classes";
import { Heading } from "@/components/ui/Heading";
import { fadeUp } from "@/lib/motion";
import type { Event } from "@/types/event";
import type {
  GalleryPhoto,
  LightboxPhoto,
  TimelinePhoto,
} from "@/types/gallery";

import { GalleryExtraModal } from "./GalleryExtraModal";
import { GalleryMoreButton } from "./GalleryMoreButton";
import { PhotoLightbox } from "./PhotoLightbox";
import { Timeline } from "./Timeline";

type GalleryProps = {
  event: Event;
  timeline: TimelinePhoto[];
  gallery: GalleryPhoto[];
};

type LightboxState = {
  photos: LightboxPhoto[];
  index: number;
};

export function Gallery({ event, timeline, gallery }: GalleryProps) {
  const reduceMotion = useReducedMotion();
  const [extraOpen, setExtraOpen] = useState(false);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  function openTimeline(index: number) {
    setLightbox({
      photos: timeline.map((photo) => ({
        id: photo.id,
        src: photo.src,
        alt: photo.alt,
        caption: photo.label,
      })),
      index,
    });
  }

  function openGalleryPhoto(index: number) {
    setLightbox({
      photos: gallery.map((photo) => ({
        id: photo.id,
        src: photo.src,
        alt: photo.alt,
        caption: photo.caption ?? photo.alt,
      })),
      index,
    });
  }

  return (
    <section
      id="momentos"
      aria-labelledby="momentos-titulo"
      className={`${invitationSectionClass} bg-surface`}
    >
      <div className="mx-auto w-full max-w-md py-10 sm:py-12">
        <motion.div className="px-4" {...fadeUp(reduceMotion)}>
          <div className="text-center">
            <Heading
              level={2}
              hand
              id="momentos-titulo"
              className="text-[2.15rem] leading-tight sm:text-5xl"
            >
              {event.galleryTitle}
            </Heading>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">
              {event.gallerySubtitle}
            </p>
          </div>
        </motion.div>

        <motion.div className="mt-2" {...fadeUp(reduceMotion)}>
          <Timeline photos={timeline} onOpenPhoto={openTimeline} />
        </motion.div>

        {gallery.length > 0 ? (
          <motion.div className="relative mt-8 px-4" {...fadeUp(reduceMotion)}>
            <div className="flex items-end gap-3">
              <div className="animate-float-slow shrink-0">
                <DecorImage
                  src="/images/animals/pony.webp"
                  width={400}
                  height={360}
                  className="!w-20 max-w-none"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col items-center gap-2 pb-1">
                <GalleryMoreButton
                  label={event.galleryMoreLabel}
                  onClick={() => setExtraOpen(true)}
                />
                <p className="flex items-center gap-1.5 text-center text-xs text-muted">
                  <Heart
                    aria-hidden
                    className="size-3 fill-accent text-accent"
                    strokeWidth={1.5}
                  />
                  Clique para abrir a galeria completa
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </div>

      {extraOpen ? (
        <GalleryExtraModal
          title={event.galleryMoreLabel}
          photos={gallery}
          onClose={() => setExtraOpen(false)}
          onOpenPhoto={openGalleryPhoto}
          suppressEscape={Boolean(lightbox)}
        />
      ) : null}

      {lightbox ? (
        <PhotoLightbox
          photos={lightbox.photos}
          index={lightbox.index}
          reduceMotion={Boolean(reduceMotion)}
          onClose={() => setLightbox(null)}
          onGoTo={(index) =>
            setLightbox((current) =>
              current ? { ...current, index } : current,
            )
          }
        />
      ) : null}
    </section>
  );
}
