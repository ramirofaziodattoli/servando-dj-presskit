import { TechnicalRiderElement } from "./@types";
import { images } from "./assets";

export const DJ_INFO = {
  driveUrl:
    "https://drive.google.com/drive/folders/18A6VI-ipyeiOF3wdf6mGPMO8916wplLG?usp=sharing",
  name: "JOHN DOE",
  email: "hello@johndoe.com",
  location: "bariloche, argentina",
  eventTypes: "Clubes, Festivales o Eventos Privados",
  shortBio:
    "DJ underground de Bariloche, Argentina. Fusiona Techno, Hardcore, Trance y Freestyle en sets potentes. Más de 11 años de experiencia y más de 60 presentaciones en clubes, festivales y eventos privados.",
  longBio:
    "John Doe es un DJ underground y apasionado de la música electrónica radicado en Bariloche, Argentina, conocido por fusionar potentes sonidos de Techno, Hardcore, Trance e influencias Freestyle en sets cargados de energía.\n\nCon más de 11 años de experiencia y más de 60 presentaciones, ha recorrido clubes, fiestas privadas y festivales, destacándose por su intensidad y presencia en cabina.\n\nSu estilo se caracteriza por beats agresivos y transiciones envolventes, creando viajes sonoros que reflejan su identidad y fuerza creativa. Desde clubes íntimos hasta grandes escenarios, John Doe transforma cada show en una experiencia inolvidable para quienes buscan más que solo música: buscan conexión, ritmo y energía sin límites.",
  socials: [
    { icon: "instagram", url: "#" },
    { icon: "spotify", url: "#" },
    { icon: "soundcloud", url: "#" },
  ],
  genres: ["TECHNO", "HARDCORE", "TRANCE", "FREESTYLE"],
  yearsOfExperience: 11,
  totalEvents: 62,
  mixedMinutes: 8912,
};

export const TECHNICAL_RIDER: TechnicalRiderElement[] = [
  {
    title: "Player 1",
    name: "CDJ - 3000",
    img: images.CDJ_3000,
    detail: "Linkeada y actualizada con el último firmware",
  },
  {
    title: "Player 2",
    name: "CDJ - 3000",
    img: images.CDJ_3000,
    detail: "Linkeada y actualizada con el último firmware",
  },
  {
    title: "MIXER",
    name: "DJM - V10",
    img: images.DJM_V10,
    detail: "Actualizada con el último firmware",
  },
  {
    title: "REMIX STATION",
    name: "RMX - 1000",
    img: images.RMX_1000,
    detail: "Conectada al Send/Return del mixer",
  },
  {
    title: "Player 3",
    name: "CDJ - 3000",
    img: images.CDJ_3000,
    detail: "Linkeada y actualizada con el último firmware",
  },
  {
    title: "Player 4",
    name: "CDJ - 3000",
    img: images.CDJ_3000,
    detail: "Linkeada y actualizada con el último firmware",
  },
];
