import { getApprovedMessages, getEvent, getGalleryPhotos, getTimelinePhotos } from "@/lib/data";

import { BackgroundMusic } from "./BackgroundMusic";
import { Closing } from "./Closing/Closing";
import { Countdown } from "./Countdown/Countdown";
import { Gallery } from "./Gallery/Gallery";
import { Hero } from "./Hero/Hero";
import { Location } from "./Location/Location";
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
        <Location event={event} />
        <Closing event={event} />
      </main>
      <BackgroundMusic />
    </>
  );
}
