import { appRoutes } from "@/contants/routes";

type LinkItem = { href: string; content: string };

export const LINK_ITEMS: LinkItem[] = [
  { href: appRoutes.bio, content: "biografía" },
  { href: appRoutes.nextDates, content: "eventos" },
  { href: appRoutes.music, content: "música" },
  { href: appRoutes.gallery, content: "galería" },
  { href: appRoutes.technicalRider, content: "rider técnico" },
  { href: appRoutes.contact, content: "contacto" },
];
