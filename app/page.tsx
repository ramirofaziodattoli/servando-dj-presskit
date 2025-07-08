import Home from "@/sections/Home";
import InifiniteCarrousel from "@/components/InifiniteCarrousel";
import Events from "@/sections/Events";
import About from "@/sections/About";
import Gallery from "@/sections/Gallery";
import TechnicalRider from "@/sections/TechnicalRider";
import Contacto from "@/sections/Contact";
import { DJ_INFO } from "@/DATA";
import Releases from "@/sections/Releases";
import Soundcloud from "@/sections/Soundcloud";

export default function Index() {
  return (
    <main className="relative">
      <Home />
      <InifiniteCarrousel Map={DJ_INFO.genres} />
      <About />
      <InifiniteCarrousel publicLogos />
      <Events />
      <Soundcloud />
      <Releases />
      <Gallery />
      <TechnicalRider />
      <Contacto />
    </main>
  );
}
