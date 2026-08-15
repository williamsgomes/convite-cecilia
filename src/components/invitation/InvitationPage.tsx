import { getApprovedMessages, getEvent } from "@/lib/data";

import { BackgroundMusic } from "./BackgroundMusic";
import { Countdown } from "./Countdown/Countdown";
import { Hero } from "./Hero/Hero";
import { Messages } from "./Messages/Messages";
import { Rsvp } from "./Rsvp/Rsvp";
import { Story } from "./Story/Story";

export function InvitationPage() {
  const event = getEvent();
  const messages = getApprovedMessages();

  return (
    <>
      <main id="conteudo" className="flex-1">
        <Hero event={event} />
        <Story event={event} />
        <Countdown event={event} />
        <Rsvp event={event} />
        <Messages event={event} messages={messages} />
      </main>
      <BackgroundMusic />
    </>
  );
}
