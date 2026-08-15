import { getEvent } from "@/lib/data/events";

import { BackgroundMusic } from "./BackgroundMusic";
import { Countdown } from "./Countdown/Countdown";
import { Hero } from "./Hero/Hero";
import { Story } from "./Story/Story";

export function InvitationPage() {
  const event = getEvent();

  return (
    <>
      <main id="conteudo" className="flex-1">
        <Hero event={event} />
        <Story event={event} />
        <Countdown event={event} />
      </main>
      <BackgroundMusic />
    </>
  );
}
