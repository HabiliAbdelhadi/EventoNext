import { notFound } from "next/navigation";

import EventCard from "./eventCard";
import PaginationControls from "./PaginationControls";
import { getEvents } from "@/lib/server-utils";

export default async function EventsList({
  city,
  page,
}: {
  city: string;
  page: number;
}) {
  const { events, count } = await getEvents(city, page);
  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : "";
  const nextPath = count > 6 * page ? `/events/${city}?page=${page + 1}` : "";

  if (page > 1 + count / 6) {
    return notFound();
  }

  return (
    <section className="flex max-w-[1100px] flex-wrap justify-center gap-10 px-[20px]">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </section>
  );
}
