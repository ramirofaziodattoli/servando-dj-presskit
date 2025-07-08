"use client";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import Text from "../Text/Text";
import Icon from "../Icons/Icon";
import { Release } from "@/@types";
import DefaultButton from "../Buttons/DefaultButton";
import { UseIsMobile } from "@/hooks/UseIsMobile";
import { motion } from "framer-motion";

interface ReleaseCardsProps {
  releases: Release[];
}

const ReleaseCards: React.FC<ReleaseCardsProps> = ({ releases }) => {
  const [isMobile, hasMounted] = UseIsMobile(768);

  const limit = hasMounted && isMobile ? 4 : 8;

  const [showAll, setShowAll] = useState(false);
  const displayedReleases = showAll ? releases : releases?.slice(0, limit);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-10">
      {displayedReleases &&
        displayedReleases.map((item, index) => {
          return <Card key={index} {...item} index={index} />;
        })}
      {releases && releases.length > limit && !showAll && (
        <DefaultButton
          variant="basic"
          onClick={() => setShowAll(!showAll)}
          className="mx-auto md:col-span-3 xl:col-span-4"
          childrenClassName="flex gap-2"
        >
          VER MÁS
          <Icon src="arrow" className="rotate-90 size-5" />
        </DefaultButton>
      )}
    </div>
  );
};

interface CardProps extends Release {
  index: number;
}

const Card: React.FC<CardProps> = ({ date, index, name, recordLabel }) => {
  return (
    <motion.article
      style={{ boxShadow: "4px 4px 2px var(--color-accent)" }}
      className={twMerge(
        "bg-secondary-lighter relative overflow-hidden shadow-md max-w-[500px] flex flex-col items-center justify-around aspect-square mx-auto p-8 w-full gap-8"
      )}
    >
      <Text variant="subtitle" Tag={"h5"} className={twMerge("!text-center")}>
        {name}
      </Text>
      <Text variant="content" className="font-normal opacity-60 !text-center">
        {recordLabel}
      </Text>
      <div className="flex items-center gap-2">
        <Icon src="calendar" className="text-accent size-5" />
        <Text variant="content" className="font-normal">
          {date}
        </Text>
      </div>
    </motion.article>
  );
};

export default ReleaseCards;
