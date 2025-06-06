import { Event } from "@/@types";
import EventCards from "../components/Cards/EventCards";
import RouteID from "../components/RouteID";
import AnimatedText from "../components/Text/AnimatedText";
import Text from "../components/Text/Text";
import { appRoutes } from "../contants/routes";

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
  const events: Event[] = await getEvents();

  const noEvents = !events || events.length === 0;

  return (
    <section className="section-py section-px section-max-w mx-auto flex flex-col gap-10">
      <RouteID id={appRoutes.nextDates} />
      <AnimatedText variant="title" Tag={"h2"} content="PRÓXIMAS FECHAS" />
      <Text variant="content" className="!text-center max-w-[800px] mx-auto">
        {!noEvents
          ? "Estas son las próximas fechas confirmadas donde vas a poder disfrutar de un set en vivo cargado de energía, ritmos intensos y pura conexión."
          : "Por el momento no hay fechas confirmadas. ¡Estate atento a las próximas novedades!"}
      </Text>

      {!noEvents && <EventCards events={events} />}
    </section>
  );
}
