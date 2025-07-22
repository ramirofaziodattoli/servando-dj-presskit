"use client";
import { useRef, useState } from "react";
import Text from "../Text/Text";
import { Event } from "@/@types";
import Icon from "../Icons/Icon";
import { motion } from "framer-motion";
import DefaultButton from "../Buttons/DefaultButton";
import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";

interface EventCardsInterface {
  events: Event[];
  past?: boolean;
}

const EventCards: React.FC<EventCardsInterface> = ({
  events,
  past = false,
}) => {
  const [showAll, setShowAll] = useState(false);
  const displayedEvents = showAll ? events : events?.slice(0, 4);

  return (
    <div className="grow flex flex-col gap-10">
      {displayedEvents &&
        displayedEvents.map((item, index) => {
          return <Card key={index} {...item} index={index} past={past} />;
        })}
      {events && events.length > 4 && !showAll && (
        <DefaultButton
          variant="basic"
          onClick={() => setShowAll(!showAll)}
          className="mx-auto"
          childrenClassName="flex gap-2"
        >
          VER MÁS
          <Icon src="arrow" className="rotate-90 size-5" />
        </DefaultButton>
      )}
    </div>
  );
};

interface CardInterface extends Event {
  index: number;
  past?: boolean;
}

const Card: React.FC<CardInterface> = ({
  name,
  date,
  link,
  location,
  past = false,
  index,
}) => {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <motion.article
      ref={ref}
      className={twMerge(
        "flex flex-col relative items-center justify-center overflow-hidden bg-secondary-lighter p-8 lg:px-16 w-full h-full gap-8 lg:flex-row lg:justify-start lg:h-[300px]",
        past && "lg:h-[200px]"
      )}
    >
      {!past && (
        <>
          <motion.div
            className="w-[50%] h-full absolute top-0 left-0 bg-accent z-30"
            animate={{ x: inView ? "-200%" : 0 }}
            transition={{
              duration: 1,
              ease: [0.39, -0.02, 0.29, 1.14],
            }}
          ></motion.div>
          <motion.div
            className="w-[50%] h-full absolute top-0 right-0 bg-accent z-30"
            animate={{ x: inView ? "200%" : 0 }}
            transition={{
              duration: 1,
              ease: [0.39, -0.02, 0.29, 1.14],
            }}
          ></motion.div>
        </>
      )}
      <div className="lg:w-[200px] xl:!w-xl">
        <Text variant="subtitle" Tag={"h5"}>
          {name}
        </Text>
      </div>
      <div className="w-full h-[0.2px] bg-[#272727] lg:w-[0.2px] lg:h-full" />
      <div
        className={twMerge(
          "flex flex-col items-center gap-8 lg:flex-2 lg:items-start lg:pl-10",
          past &&
            "md:flex-row justify-around lg:justify-start lg:gap-10 xl:gap-20"
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <Icon src="calendar" className="text-accent size-5 lg:self-start" />
          <Text variant="content" className="font-normal">
            {date}
          </Text>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon src="location" className="text-accent size-5 lg:self-start" />
          <Text variant="content" className="font-normal">
            {location}
          </Text>
        </div>
      </div>
      {link && link.trim() !== "" && (
        <DefaultButton href={link}>TICKETS</DefaultButton>
      )}
    </motion.article>
  );
};

export default EventCards;
