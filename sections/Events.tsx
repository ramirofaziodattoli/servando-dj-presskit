import { Event } from "@/@types";
import EventCards from "../components/Cards/EventCards";
import RouteID from "../components/RouteID";
import Text from "../components/Text/Text";
import { appRoutes } from "../contants/routes";
import { twMerge } from "tailwind-merge";
import AnimatedSeparator from "@/components/AnimatedSeparator";

const getEvents = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getEvents`,
      { cache: "no-cache" }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const dynamic = "force-dynamic";

export default async function Events() {
  const data = await getEvents();
  const pastEvents = data?.pastEvents || [];
  const upcomingEvents = data?.upcomingEvents || [];

  const noUpcoming = !upcomingEvents || upcomingEvents.length === 0;
  const noPast = !pastEvents || pastEvents.length === 0;

  return (
    <section
      className={twMerge(
        "section-px section-max-w mx-auto flex flex-col gap-10 section-py ",
        noUpcoming && noPast && "!py-40"
      )}
    >
      <RouteID id={appRoutes.nextDates} />

     
      {noUpcoming && noPast && (
        <Text variant="content" className="!text-center max-w-[800px] mx-auto">
          Próximas fechas a confirmar. ¡Estate atento a las próximas novedades!
        </Text>
      )}

      {!noUpcoming && (
        <>
          <Text variant="title" Tag={"h2"}>
            PRÓXIMOS
            <br className="md:hidden" /> EVENTOS
          </Text>

          <EventCards events={upcomingEvents} />
        </>
      )}

      {!noUpcoming && !noPast && <AnimatedSeparator />}
      {!noPast && (
        <>
          <Text variant="title" Tag={"h2"}>
            EVENTOS
            <br className="md:hidden" /> ANTERIORES
          </Text>

          <EventCards past events={pastEvents} />
        </>
      )}
    </section>
  );
}
