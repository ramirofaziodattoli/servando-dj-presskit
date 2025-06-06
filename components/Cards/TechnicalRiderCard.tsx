"use client";
import { TechnicalRiderElement } from "@/@types";
import { twMerge } from "tailwind-merge";
import Text from "../Text/Text";
import LandingImage from "../Images/LandingImage";
import { ImagesKey } from "@/assets";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface TechnicalRiderCardProps extends TechnicalRiderElement {
  className?: string;
}

const TechnicalRiderCard: React.FC<TechnicalRiderCardProps> = ({
  img,
  name,
  title,
  detail,
  className,
}) => {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <motion.article
      ref={ref}
      className={twMerge(
        "bg-secondary-lighter relative overflow-hidden p-5 md:p-8 gap-5 flex flex-col  md:w-full xl:h-[40vh] min-h-[400px] lg:min-h-[500px] justify-between",
        className
      )}
    >
      <motion.div
        className="w-[50%] h-full absolute top-0 left-0 bg-accent z-50"
        animate={{ x: inView ? "-200%" : 0 }}
        transition={{
          duration: 1.2,
          type: "spring",
          mass: 0.3,
          stiffness: 25,
        }}
      ></motion.div>
      <motion.div
        className="w-[50%] h-full absolute top-0 right-0 bg-accent z-50"
        animate={{ x: inView ? "200%" : 0 }}
        transition={{
          duration: 1.2,
          type: "spring",
          mass: 0.3,
          stiffness: 25,
        }}
      ></motion.div>

      <Text
        variant="custom"
        className="uppercase opacity-50 !text-left"
        Tag={"h5"}
      >
        {title}
      </Text>
      <LandingImage
        noPreload
        force
        src={img as ImagesKey}
        alt={name}
        width={400}
        height={400}
        className="h-auto mx-auto w-full xl:h-full xl:w-auto"
      />
      <Text variant="subtitle" className="uppercase" Tag={"h5"}>
        {name}
      </Text>
    </motion.article>
  );
};

export default TechnicalRiderCard;
