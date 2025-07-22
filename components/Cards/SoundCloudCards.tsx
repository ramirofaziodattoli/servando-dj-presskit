"use client";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import Text from "../Text/Text";
import LandingLink from "../LandingLink/LandingLink";
import { UseIsMobile } from "@/hooks/UseIsMobile";
import { ImagesKey, logos } from "@/assets";
import DefaultButton from "../Buttons/DefaultButton";
import Icon from "../Icons/Icon";
import LandingImage from "../Images/LandingImage";

interface SoundCloudTrack {
  id: number;
  title: string;
  duration: number;
  artwork_url?: string;
  permalink_url: string;
}

interface SoundCloudCardsProps {
  tracks: SoundCloudTrack[];
}

const SoundCloudCards: React.FC<SoundCloudCardsProps> = ({ tracks }) => {
  const [isMobile, hasMounted] = UseIsMobile(768);
  const limit = hasMounted && isMobile ? 3 : 6;
  const [showAll, setShowAll] = useState(false);
  const displayedTracks = showAll ? tracks : tracks?.slice(0, limit);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
      {displayedTracks &&
        displayedTracks.map((track, index) => {
          return <Card key={track.id} {...track} index={index} />;
        })}
      {tracks && tracks.length > limit && !showAll && (
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

interface CardProps extends SoundCloudTrack {
  index: number;
}

function formatDuration(durationMs: number): string {
  const totalSeconds = Math.floor(durationMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}

const Card: React.FC<CardProps> = ({
  title,
  duration,
  artwork_url,
  permalink_url,
}) => {
  return (
    <LandingLink
      href={permalink_url}
      newTab
      containerClassName="w-full"
      className=""
    >
      <article
        className={twMerge(
          "bg-secondary-lighter hover:!shadow-none transition duration-300 relative overflow-hidden shadow-md max-w-[500px] flex flex-col items-center justify-end aspect-square mx-auto p-0 w-full group"
        )}
      >
        {/* Imagen de fondo */}
        <div className="absolute inset-0 w-full h-full">
          <LandingImage
            force
            width={500}
            height={500}
            src={
              (artwork_url
                ? artwork_url.replace("-large", "-t500x500")
                : logos.logo_2) as ImagesKey
            }
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-secondary/40  to-transparent" />
        </div>
        {/* Overlay con gradiente y título */}
        <div className="relative z-10 p-6 flex flex-col justify-end h-full w-full">
          <Text
            variant="subtitle"
            Tag="h3"
            className="font-normal mb-2 line-clamp-2"
          >
            {title}
          </Text>
          {duration ? (
            <Text variant="content" className="text-white/70 text-sm">
              {formatDuration(duration)}
            </Text>
          ) : (
            <Text variant="content" className="text-white/50 text-sm">
              Duración no disponible
            </Text>
          )}
        </div>
        {/* Icono de play superpuesto */}
        <div className="absolute inset-0 flex items-center justify-center md:opacity-0 group-hover:opacity-100 transition z-20 animate-pulse md:animate-none">
          <div className="bg-white/20 rounded-full p-3 md:p-4">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </article>
    </LandingLink>
  );
};

export default SoundCloudCards;
