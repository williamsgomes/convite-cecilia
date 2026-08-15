import { EVENT_ID } from "@/mock/event";
import type { Message } from "@/types/message";

export const messages: Message[] = [
  {
    id: "msg-1",
    eventId: EVENT_ID,
    name: "Vovó Lúcia",
    message:
      "Minha neta mais linda, que o seu 1 aninho seja só o começo de uma vida cheia de amor, brincadeiras e muita fazendinha!",
    approved: true,
    createdAt: "2026-08-10T14:00:00-03:00",
  },
  {
    id: "msg-2",
    eventId: EVENT_ID,
    name: "Vovó Maria",
    message:
      "Cecília, sua alegria ilumina a família inteira. Estamos contando os minutos para comemorar com você!",
    approved: true,
    createdAt: "2026-08-11T09:30:00-03:00",
  },
  {
    id: "msg-3",
    eventId: EVENT_ID,
    name: "Tia Helena",
    message:
      "Que festa especial para uma menina tão especial. Mal posso esperar para te ver de xadrezinho e sorrisão!",
    approved: true,
    createdAt: "2026-08-12T18:15:00-03:00",
  },
  {
    id: "msg-4",
    eventId: EVENT_ID,
    name: "Mensagem pendente",
    message: "Esta mensagem ainda não foi aprovada e não deve aparecer no convite.",
    approved: false,
    createdAt: "2026-08-13T10:00:00-03:00",
  },
];
