import { DJ_INFO, TECHNICAL_RIDER } from "@/DATA";
import Text from "../components/Text/Text";
import { appRoutes } from "@/contants/routes";
import RouteID from "../components/RouteID";
import { twMerge } from "tailwind-merge";
import TechnicalRiderCard from "../components/Cards/TechnicalRiderCard";
import DefaultButton from "../components/Buttons/DefaultButton";
import AnimatedText from "../components/Text/AnimatedText";

export default function TechnicalRider() {
  return (
    <section className="section-py section-px flex flex-col gap-10 md:grid md:place-items-center section-max-w mx-auto">
      <RouteID id={appRoutes.technicalRider} />
      <AnimatedText Tag={"h2"} variant="title" content="RIDER TÉCNICO" />
      <Text variant="content" className="!text-center max-w-[800px] mx-auto">
        Para garantizar una experiencia <strong>óptima</strong> en cada
        presentación, se requiere el siguiente equipamiento:
      </Text>
      {/* MOBILE SECTION */}
      <div className="w-full flex flex-col gap-5 md:grid md:grid-cols-2 place-items-center mt-[10vh]">
        {TECHNICAL_RIDER.map((item, index) => {
          return (
            <TechnicalRiderCard
              key={`p_${index}`}
              {...item}
              className={twMerge("")}
            />
          );
        })}
      </div>
      <DefaultButton
        variant="secondary"
        href={DJ_INFO.driveUrl}
        className="uppercase mx-auto"
      >
        ver detalles
      </DefaultButton>
    </section>
  );
}
