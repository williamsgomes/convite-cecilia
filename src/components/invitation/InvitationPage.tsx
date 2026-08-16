import { getInvitationData } from "@/lib/data";

import { BackgroundMusic } from "./BackgroundMusic";
import { Closing } from "./Closing/Closing";
import { Countdown } from "./Countdown/Countdown";
import { Gallery } from "./Gallery/Gallery";
import { Hero } from "./Hero/Hero";
import { Location } from "./Location/Location";
import { Messages } from "./Messages/Messages";
import { Rsvp } from "./Rsvp/Rsvp";
import { Story } from "./Story/Story";

export async function InvitationPage() {
  const { event, messages, timeline, gallery } = await getInvitationData();

  return (
    <>
      <main id="conteudo" className="flex-1 overflow-x-clip">
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
