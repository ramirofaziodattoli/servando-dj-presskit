import GradientBackground from "../components/AnimatedBackgrounds/GradientBackground";
import LandingImage from "../components/Images/LandingImage";
import Text from "../components/Text/Text";
import { DJ_INFO } from "@/DATA";
import Counter from "../components/Counter";
import { twMerge } from "tailwind-merge";
import InfiniteTextMoveOnScroll from "../components/InfiniteTextMoveOnScroll";
import RouteID from "../components/RouteID";
import AnimatedText from "../components/Text/AnimatedText";
import { appRoutes } from "@/contants/routes";

export default function About() {
  return (
    <main className="overflow-hidden relative">
      <div
        className={twMerge(
          "absolute top-0 h-[100px] w-screen !z-[99] from-secondary to-secondary/0 bg-gradient-to-b"
        )}
      />
      <RouteID id={appRoutes.whoIAm} />
      <div className="pt-[50px] lg:pb-[50px] overflow-hidden">
        <GradientBackground containerClassName="backdrop-blur-xs  absolute section-mx mx-auto lg:!mx-0 lg:max-w-[600px]">
          <LandingImage
            src="homeMock1"
            alt="mock-2"
            className="relative w-full h-full object-cover"
            width={600}
            height={600}
          />
        </GradientBackground>
        <div className="w-full section-max-w mx-auto pt-[100px] md:pt-[150px] lg:pl-[25%] 2xl:pl-[20%] lg:!pr-20 pointer-events-none h-[700px] md:h-[750px]">
          <div className="flex items-center section-px py-10 lg:px-40 justify-center gap-10 flex-col bg-gradient-to-t lg:bg-gradient-to-tr lg:p-20 from-secondary via-secondary/80  to-secondary/10 backdrop-blur-xs h-full">
            <div className="">
              <AnimatedText
                Tag={"h2"}
                variant="title"
                className="uppercase"
                content="¿Quién soy?"
              />
            </div>
            <div className="grow w-full flex flex-col gap-5">
              <TextBlock title="Ubicacíon" desc={DJ_INFO.location} />
              <TextBlock title="Tipos de eventos" desc={DJ_INFO.eventTypes} />

              <div className="grid grid-cols-2 gap-10 py-5">
                <CounterBlock
                  desc="Años de experiencia"
                  endValue={DJ_INFO.yearsOfExperience}
                />
                <CounterBlock
                  desc="Eventos realizados"
                  endValue={DJ_INFO.totalEvents}
                />
                <CounterBlock
                  showMore
                  desc="Minutos mixeando"
                  endValue={DJ_INFO.mixedMinutes}
                  className="col-span-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[50px] lg:pb-[50px] relative">
        <RouteID id={appRoutes.bio} />
        <InfiniteTextMoveOnScroll
          rotateOnLg
          text={"DJ " + DJ_INFO.name}
          className="absolute top-2 -z-5 left-0 lg:-translate-x-[100vw] xl:-translate-x-[60vw] 2xl:-translate-x-[50vw]"
        />
        <GradientBackground containerClassName="backdrop-blur-xs absolute section-mx mx-auto lg:!mx-0 lg:max-w-[600px] lg:right-0">
          <LandingImage
            src="homeMock1"
            alt="mock-2"
            className="relative z-10 w-full h-full object-cover"
            width={600}
            height={600}
          />
        </GradientBackground>
        <div className="w-full section-max-w mx-auto pt-[100px] md:pt-[150px] lg:pr-[25%] 2xl:pr-[20%] lg:!pl-20 pointer-events-none min-h-[700px] md:h-[750px]">
          <div className="flex items-center section-px py-10 lg:px-40 justify-center gap-10 flex-col bg-gradient-to-t lg:bg-gradient-to-tl lg:p-20 from-secondary via-secondary/80  to-secondary/10 backdrop-blur-xs h-full">
            <div>
              <AnimatedText
                Tag={"h2"}
                variant="title"
                className="uppercase"
                content="BIO"
              />
            </div>
            <Text variant="content">{DJ_INFO.longBio}</Text>
          </div>
        </div>
      </div>
      <div
        className={twMerge(
          "absolute bottom-0 h-[100px] w-screen !z-[99] from-secondary to-secondary/0 bg-gradient-to-t"
        )}
      />
    </main>
  );
}

const TextBlock: React.FC<{ title: string; desc: string }> = ({
  title,
  desc,
}) => {
  return (
    <div className="flex flex-col">
      <Text
        Tag={"h5"}
        variant="custom"
        className="uppercase text-3xl lg:text-left"
      >
        {title}
      </Text>
      <Text variant="content" className="lg:text-left capitalize" Tag={"p"}>
        {desc}
      </Text>
    </div>
  );
};

const CounterBlock: React.FC<{
  className?: string;
  desc: string;
  endValue: number;
  showMore?: boolean;
}> = ({ className, desc, endValue, showMore = false }) => {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center gap-2 w-full justify-center",
        className
      )}
    >
      <Counter showMore={showMore} endValue={endValue} duration={2000} />
      <Text
        variant="custom"
        className="text-lg/5 lg:text-xl/5 font-bold"
        Tag={"p"}
      >
        {desc}
      </Text>
    </div>
  );
};
