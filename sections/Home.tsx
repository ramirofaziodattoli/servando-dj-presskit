"use client";
import { LogosKeys } from "@/assets";
import Icon from "../components/Icons/Icon";
import LandingImage from "../components/Images/LandingImage";
import Text from "../components/Text/Text";
import { twMerge } from "tailwind-merge";
import { DJ_INFO } from "@/DATA";
import LandingLink from "../components/LandingLink/LandingLink";
import { motion } from "framer-motion";
import GradientBackground from "../components/AnimatedBackgrounds/GradientBackground";
import MagneticContainer from "../components/Buttons/MagneticContainer";

export default function Home() {
  return (
    <motion.div
      initial={{ y: 300 }}
      animate={{
        y: 0,
        transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 1.2 },
      }}
    >
      <GradientBackground
        followCursor
        containerClassName="min-h-screen xl:h-screen  pt-[100px] xl:pt-0 overflow-hidden bg-secondary"
      >
        <div className="w-full h-full flex flex-col section-px lg:!px-0 lg:!pl-20 2xl:!px-20 section-max-w mx-auto">
          <div className="flex-1 grid lg:grid-cols-2 gap-10 lg:gap-0 h-full min-h-[calc(100vh-100px)]">
            <div className="w-full h-full flex flex-col justify-center items-center lg:items-start gap-5 pt-10 lg:pb-20">
              <Text
                Tag={"h1"}
                variant="custom"
                className="text-7xl md:text-[150px]/30 lg:text-[130px]/30 xl:text-[200px]/40 lg:text-left relative w-fit"
              >
                {DJ_INFO.name}
              </Text>
              <p className="text-accent">Electronic Music</p>
              <Text variant="content" className="">
                {DJ_INFO.shortBio}
              </Text>
              <div className="flex mt-10 justify-around lg:justify-start lg:gap-20 w-full lg:w-2/3">
                {DJ_INFO.socials.map(({ icon, url }, index) => (
                  <MagneticContainer key={index}>
                    <LandingLink href={url} newTab key={index}>
                      <Icon
                        src={icon as LogosKeys}
                        className={twMerge(
                          "text-accent size-12 hover:text-white"
                        )}
                      />
                    </LandingLink>
                  </MagneticContainer>
                ))}
              </div>
            </div>
            <div className="grid place-content-end">
              <LandingImage
                noPreload
                priority
                src="homeMock1"
                alt="home-mock-1"
                className="lg:translate-x-12 w-full h-auto px-10 translate-y-10"
                width={800}
                height={800}
              />
            </div>

            {/* 
            //! OPCION DE VINILO 
             */}
            {/* <div className="card-3d rounded-full aspect-square">
              <div className="relative animate-spin-slow overflow-hidden h-fit flex items-center justify-center rounded-full bg-secondary">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent rounded-full" />
                <LandingImage
                  noPreload
                  priority
                  src="homeMock3"
                  alt="home-mock-3"
                  className="w-full h-auto rounded-full aspect-square object-cover -z-10 scale-90"
                  style={{
                    boxShadow: "0 0 300px 300px #000",
                    filter: "contrast(1.2) brightness(1.05)",
                  }}
                  width={500}
                  height={500}
                />
                <div className="size-6 absolute z-50 bg-neutral-900 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
                <div className="size-20 absolute z-50 border-2 border-accent/50 rounded-full shadow-[0_0_15px_rgba(200,182,255,0.2)]" />

                <div className="absolute inset-0">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 rounded-full border border-neutral-800 aspect-square opacity-50"
                      style={{
                        transform: `scale(${1 - i * 0.018})`,
                        boxShadow:
                          i % 3 === 0
                            ? "inset 0 0 5px rgba(255,255,255,0.03)"
                            : "none",
                        borderWidth: "1px",
                      }}
                    />
                  ))}
                </div>

                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 10% 30%, rgba(255,255,255,0.15) 0%, transparent 30%)",
                    filter: "blur(15px)",
                    transform: "rotate(20deg)",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-secondary/30 rounded-full" />
              </div>
            </div> */}
          </div>
        </div>
      </GradientBackground>
    </motion.div>
  );
}

const LocationText: React.FC<{ className?: string; col?: boolean }> = ({
  className,
  col = false,
}) => {
  return (
    <div className={className}>
      <Text
        variant="custom"
        className={twMerge(
          "flex items-center uppercase gap-1",
          col ? "flex-col" : "flex-row"
        )}
      >
        <Icon
          src="location"
          className="size-6 text-accent pointer-events-none "
        />
        {DJ_INFO.location}
      </Text>
    </div>
  );
};
