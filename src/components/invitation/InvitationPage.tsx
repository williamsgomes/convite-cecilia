import { getEvent } from "@/lib/data/events";

import { Hero } from "./Hero/Hero";

export function InvitationPage() {
  const event = getEvent();

  return (
    <main id="conteudo" className="flex-1">
      <Hero event={event} />
    </main>
  );
}
