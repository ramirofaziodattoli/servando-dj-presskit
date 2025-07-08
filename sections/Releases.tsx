import ReleaseCards from "@/components/Cards/ReleaseCards";
import AnimatedText from "../components/Text/AnimatedText";
import Text from "../components/Text/Text";
import { twMerge } from "tailwind-merge";

const getReleases = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getReleases`,
      { cache: "no-cache" }
    );
    const data = await res.json();
    return data.upcomingReleases || [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const dynamic = "force-dynamic";

export default async function Releases() {
  const releases = await getReleases();

  const noReleases = releases.length === 0;

  if (noReleases) {
    return <></>;
  }

  return (
    <section
      className={twMerge(
        "section-px section-max-w mx-auto flex flex-col gap-10 section-py ",
        noReleases && "!py-40"
      )}
    >
      <AnimatedText variant="title" Tag={"h2"} content="LANZAMIENTOS" />

      {!noReleases && (
        <>
          <Text
            variant="content"
            className="!text-center max-w-[800px] mx-auto"
          >
            Estos son los próximos lanzamientos confirmados.
          </Text>
          <ReleaseCards releases={releases} />
        </>
      )}
    </section>
  );
}
