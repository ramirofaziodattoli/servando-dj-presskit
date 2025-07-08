import AnimatedText from "../components/Text/AnimatedText";
import { twMerge } from "tailwind-merge";
import SoundCloudCards from "../components/Cards/SoundCloudCards";
import RouteID from "@/components/RouteID";
import { appRoutes } from "@/contants/routes";

const getSoundcloudTracks = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/getSoundcloudTracks`,
      { cache: "no-cache" }
    );
    const data = await res.json();

    // Log para debugging
    console.log("SoundCloud API Response:", data);

    if (data.error) {
      console.error("Error en SoundCloud API:", data.error, data.details);
      return [];
    }

    return data.tracks || [];
  } catch (e) {
    console.error("Error fetching SoundCloud tracks:", e);
    return [];
  }
};

export const dynamic = "force-dynamic";

export default async function Soundcloud() {
  const tracks = await getSoundcloudTracks();
  const noTracks = tracks.length === 0;

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
