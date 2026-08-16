import { Suspense } from "react";

import { getInvitationData } from "@/lib/data";

import { Closing } from "./Closing/Closing";
import { ConfirmPresenceBar } from "./ConfirmPresenceBar";
import { Countdown } from "./Countdown/Countdown";
import { Gallery } from "./Gallery/Gallery";
import { Hero } from "./Hero/Hero";
import { InvitationShell } from "./InvitationShell";
import { Location } from "./Location/Location";
import { Messages } from "./Messages/Messages";
import { Rsvp } from "./Rsvp/Rsvp";
import { Story } from "./Story/Story";

export function InvitationPage() {
  return (
    <InvitationShell>
      <Suspense fallback={null}>
        <InvitationContent />
      </Suspense>
    </InvitationShell>
  );
}

async function InvitationContent() {
  const { event, messages, timeline, gallery } = await getInvitationData();

  return (
    <>
      <main
        id="conteudo"
        tabIndex={-1}
        className="flex-1 overflow-x-clip outline-none"
      >
        <Hero event={event} />
        <Story event={event} />
        <Countdown event={event} />
        <Rsvp event={event} />
        <Messages event={event} messages={messages} />
        <Gallery event={event} timeline={timeline} gallery={gallery} />
        <Location event={event} />
        <Closing event={event} />
      </main>
      <ConfirmPresenceBar />
    </>
  );
}
