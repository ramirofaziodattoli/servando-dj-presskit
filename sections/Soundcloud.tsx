"use client";
import { useEffect, useState } from "react";
import AnimatedText from "../components/Text/AnimatedText";
import { twMerge } from "tailwind-merge";
import RouteID from "@/components/RouteID";
import { appRoutes } from "@/contants/routes";
import SoundCloudCards from "@/components/Cards/SoundCloudCards";

const CACHE_KEY = "soundcloudTracks";
const CACHE_TIME = 3 * 60 * 60 * 1000; // 3 horas en ms

function getCachedTracks() {
  if (typeof window === "undefined") return null;
  const cache = localStorage.getItem(CACHE_KEY);
  if (!cache) return null;
  try {
    const { data, timestamp } = JSON.parse(cache);
    if (Date.now() - timestamp < CACHE_TIME) {
      return data;
    }
  } catch (e) {
    // Si el cache está corrupto, lo ignoramos
    return null;
  }
  return null;
}

function setCachedTracks(data: any) {
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ data, timestamp: Date.now() })
  );
}

function useSoundcloudTracks() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = getCachedTracks();
    if (cached) {
      setTracks(cached);
      setLoading(false);
    } else {
      fetch("/api/getSoundcloudTracks")
        .then((res) => res.json())
        .then((data) => {
          setTracks(data.tracks || []);
          setCachedTracks(data.tracks || []);
        })
        .catch((e) => {
          setTracks([]);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return { tracks, loading };
}

export default function Soundcloud() {
  const { tracks, loading } = useSoundcloudTracks();
  const noTracks = !loading && tracks.length === 0;

  if (loading) {
    return (
      <div className="py-20 text-center">Cargando tracks de SoundCloud...</div>
    );
  }
  if (noTracks) {
    return <></>;
  }

  return (
    <section
      className={twMerge(
        "section-px section-max-w mx-auto flex flex-col gap-10 section-py ",
        noTracks && "!py-40"
      )}
    >
      <RouteID id={appRoutes.music} />
      <AnimatedText variant="title" Tag={"h2"} content="SOUNDCLOUD" />
      {!noTracks && (
        <>
          <SoundCloudCards tracks={tracks} />
        </>
      )}
    </section>
  );
}
