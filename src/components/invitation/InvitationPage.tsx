import { getApprovedMessages, getEvent, getGalleryPhotos, getTimelinePhotos } from "@/lib/data";

import { BackgroundMusic } from "./BackgroundMusic";
import { Countdown } from "./Countdown/Countdown";
import { Gallery } from "./Gallery/Gallery";
import { Hero } from "./Hero/Hero";
import { Messages } from "./Messages/Messages";
import { Rsvp } from "./Rsvp/Rsvp";
import { Story } from "./Story/Story";

export function InvitationPage() {
  const event = getEvent();
  const messages = getApprovedMessages();
  const timeline = getTimelinePhotos();
  const gallery = getGalleryPhotos();

  return (
    <>
      <main id="conteudo" className="flex-1">
        <Hero event={event} />
        <Story event={event} />
        <Countdown event={event} />
        <Rsvp event={event} />
        <Messages event={event} messages={messages} />
        <Gallery event={event} timeline={timeline} gallery={gallery} />
      </main>
      <BackgroundMusic />
    </>
  );
}
