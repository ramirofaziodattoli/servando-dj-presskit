import ReleaseCards from "@/components/Cards/ReleaseCards";
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
      <Text variant="title" Tag={"h2"}>
        LANZAMIENTOS
      </Text>

      {!noReleases && (
        <>
          <ReleaseCards releases={releases} />
        </>
      )}
    </section>
  );
}
