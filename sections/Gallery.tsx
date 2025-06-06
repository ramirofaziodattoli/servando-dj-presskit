import RouteID from "../components/RouteID";
import { appRoutes } from "@/contants/routes";
import ParallaxGalleryBanner from "../components/Gallery/ParallaxGalleryBanner";
import HorizontalGallery from "../components/Gallery/HorizontalGallery";

export default function Gallery() {
  return (
    <>
      <RouteID id={appRoutes.gallery} />
      <ParallaxGalleryBanner />
      <HorizontalGallery />
    </>
  );
}
