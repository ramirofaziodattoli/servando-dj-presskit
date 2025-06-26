import { Event } from "@/@types";
import EventCards from "../components/Cards/EventCards";
import RouteID from "../components/RouteID";
import AnimatedText from "../components/Text/AnimatedText";
import Text from "../components/Text/Text";
import { appRoutes } from "../contants/routes";
import AnimatedSeparator from "@/components/AnimatedSeparator";
import { twMerge } from "tailwind-merge";
import { DJ_INFO } from "@/DATA";

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

      {noUpcoming && (
        <AnimatedText variant="title" Tag={"h2"} content="EVENTOS" />
      )}
      {noUpcoming && noPast && (
        <Text variant="content" className="!text-center max-w-[800px] mx-auto">
          Próximas fechas a confirmar. ¡Estate atento a las próximas novedades!
        </Text>
      )}

      {!noUpcoming && (
        <>
          <AnimatedText variant="title" Tag={"h2"} content="PRÓXIMOS EVENTOS" />
          <Text
            variant="content"
            className="!text-center max-w-[800px] mx-auto"
          >
            Estas son las próximas fechas confirmadas donde vas a poder
            disfrutar de un set en vivo cargado de energía, ritmos intensos y
            pura conexión.
          </Text>
          <EventCards events={upcomingEvents} />
        </>
      )}

      {!noUpcoming && !noPast && <AnimatedSeparator />}
      {!noPast && (
        <>
          <AnimatedText
            variant="title"
            Tag={"h2"}
            content="EVENTOS ANTERIORES"
          />
          <Text
            variant="content"
            className="!text-center max-w-[800px] mx-auto"
          >
            Estas fueron las últimas fechas en las que Servando compartió su
            música en vivo.
          </Text>
          <EventCards past events={pastEvents} />
        </>
      )}
    </section>
  );
}
