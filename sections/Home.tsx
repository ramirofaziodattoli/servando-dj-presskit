"use client";
import { IconKey, LogosKeys } from "@/assets";
import Icon from "../components/Icons/Icon";
import LandingImage from "../components/Images/LandingImage";
import Text from "../components/Text/Text";
import { twMerge } from "tailwind-merge";
import { DJ_INFO } from "@/DATA";
import LandingLink from "../components/LandingLink/LandingLink";
import { motion } from "framer-motion";
import GradientBackground from "../components/AnimatedBackgrounds/GradientBackground";
import MagneticContainer from "../components/Buttons/MagneticContainer";
import { useEffect, useState } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

export default function Home() {
  const [isTabActive, setIsTabActive] = useState(true);
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    // Verifica si hoy es 16 de julio
    const today = new Date();
    if (today.getMonth() === 6 && today.getDate() === 16) {
      setTimeout(() => {
        setIsBirthday(true);
      }, 3000);
    } else {
      setIsBirthday(false);
    }
    // Mantener la lógica de visibilidad de la pestaña si se requiere para otros usos
    const handleVisibility = () => {
      setIsTabActive(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <motion.div
      initial={{ y: 300 }}
      animate={{
        y: 0,
        transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 1.2 },
      }}
    >
      {isBirthday && isTabActive && (
        <>
          <Fireworks
            autorun={{ speed: 0.3, delay: 3 }}
            className="z-[100] bg-transparent fixed top-0 pointer-events-none w-screen h-screen"
          />
          <Fireworks
            autorun={{ speed: 0.2, delay: 5 }}
            className="z-[100] bg-transparent fixed top-0 pointer-events-none w-screen h-screen"
          />
        </>
      )}
      <GradientBackground
        followCursor
        containerClassName="min-h-screen xl:h-screen  pt-[100px] xl:pt-0 overflow-hidden bg-secondary"
      >
        <div className="w-full h-full flex flex-col section-px lg:!px-0 lg:!pl-20 2xl:!px-20 section-max-w mx-auto">
          <div className="flex-1 grid lg:grid-cols-2 gap-10 lg:gap-0 h-full min-h-[calc(100vh-100px)]">
            <div className="w-full h-full flex flex-col justify-center items-center lg:items-start gap-10 pt-10 lg:pb-20">
              <Text
                Tag={"h1"}
                variant="custom"
                className="text-7xl md:text-[150px]/30 lg:text-[130px]/30 xl:text-[200px]/40 lg:text-left relative w-fit"
              >
                {DJ_INFO.name}
              </Text>
              <p className="bg-clip-text text-transparent bg-radial from-primary/50 to-accent">
                Electronic Music
              </p>
              <div className="flex justify-around lg:justify-start lg:gap-20 w-full lg:w-2/3">
                {DJ_INFO.socials
                  .filter(({ icon }) => icon !== "instagram")
                  .map(({ icon, url }, index) => (
                    <MagneticContainer key={index}>
                      <LandingLink href={url} newTab key={index}>
                        <Icon
                          src={icon as IconKey}
                          className={twMerge(
                            "text-accent size-[40px] md:size-[50px] hover:text-white"
                          )}
                        />
                      </LandingLink>
                    </MagneticContainer>
                  ))}
              </div>
            </div>
            <div className="grid place-content-end">
              <img
                loading="eager"
                src="/mocks/home-mock-1.webp"
                alt="home-mock-1"
                className="lg:translate-x-12 w-full h-auto px-10 translate-y-10"
                width={1500}
                height={1500}
              />
            </div>
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
