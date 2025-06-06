/*
?   Este archivo enlaza todo lo que sea recurso estatico de la carpeta public
?   y crea los types automaticamente para los componentes y el auto completado
*/

export const images = {
  homeMock1: "/mocks/home-mock-1.webp",
  imageMock: "/images/image-mock.webp",

  CDJ_3000: "/mocks/CDJ-3000.webp",
  DJM_V10: "/mocks/DJM-V10.webp",
  XDJ_RX3: "/mocks/XDJ-RX3.webp",
  RMX_1000: "/mocks/RMX-1000.webp",

  //? Agregar mas backgrounds aca
} as const;
export type ImagesKey = keyof typeof images;

export const backgrounds = {
  //? Agregar mas backgrounds aca
} as const;
export type BackgroundsKey = keyof typeof backgrounds;

export const logos = {
  default_logo: "/logos/default-logo.svg",
  landing_banner_logo: "/logos/landing-banner-logo.png",

  //? Agregar mas logos aca
} as const;
export type LogosKeys = keyof typeof logos;

export const icons = {
  soundcloud: "/icons/soundcloud.svg",
  spotify: "/icons/spotify.svg",
  instagram: "/icons/instagram.svg",
  mail: "/icons/mail.svg",
  location: "/icons/location.svg",
  calendar: "/icons/calendar.svg",
  arrow: "/icons/arrow.svg",

  //? Agregar mas iconos aca
} as const;
export type IconKey = keyof typeof icons;
