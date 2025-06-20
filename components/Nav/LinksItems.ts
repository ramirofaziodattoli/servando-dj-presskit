import { appRoutes } from "@/contants/routes";

type LinkItem = { href: string; content: string };

export const LINK_ITEMS: LinkItem[] = [
  { href: appRoutes.nextDates, content: "eventos" },
  { href: appRoutes.whoIAm, content: "¿quién soy?" },
  { href: appRoutes.bio, content: "biografía" },
  { href: appRoutes.gallery, content: "galería" },
  { href: appRoutes.technicalRider, content: "rider técnico" },
  { href: appRoutes.contact, content: "contacto" },
];
