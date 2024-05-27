"use Client";

import EventsList from "@/components/eventsList";
import H1 from "@/components/H1";
import { Suspense } from "react";
import Loading from "./loading";
import { Metadata } from "next";
import { z } from "zod";

export function generateMetadata({
  params,
}: {
  params: { city: string };
}): Metadata {
  const city = params.city;

  return {
    title:
      city === "all"
        ? "Evento -- All Events"
        : `Evento -- Events in ${city.charAt(0).toUpperCase() + city.slice(1)}`,
    description: `Find events in ${city.charAt(0).toUpperCase() + city.slice(1)}`,
  };
}

const pageNumberSchema = z.coerce
  .number()
  .int()
  .positive()
  .optional()
  .default(1);

export default function EventsPage({
  params,
  searchParams,
}: {
  params: { city: string };
  searchParams: { [key: string]: string | string | undefined };
}) {
  const { city } = params;
  const parsedPage = pageNumberSchema.safeParse(searchParams.page);
  if (!parsedPage.success) throw new Error("Invalid page number");
  const page = parsedPage.data;

  return (
    <main className="px[20px] flex min-h-[110vh] flex-col items-center py-24">
      <H1 className="mb-28">
        {city === "all" ? (
          "All Events"
        ) : (
          <>
            Events in <span className="capitalize">{city}</span>
          </>
        )}
      </H1>
      <Suspense fallback={<Loading />} key={city + page}>
        <EventsList city={city} page={+page} />
      </Suspense>
    </main>
  );
}
