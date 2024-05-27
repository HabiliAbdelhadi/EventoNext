import "server-only";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import prisma from "./db";

export const getEvents = unstable_cache(async (city: string, page = 1) => {
  const events = await prisma.eventoEvent.findMany({
    where: {
      city: {
        contains: city === "all" ? undefined : city,
      },
    },
    orderBy: { date: "desc" },
    take: 6,
    skip: (page - 1) * 6,
  });
  const count = await prisma.eventoEvent.count({
    where: {
      city: {
        contains: city === "all" ? undefined : city,
      },
    },
  });
  return { events, count };
});

export const getEvent = unstable_cache(async (slug: string) => {
  const event = await prisma.eventoEvent.findUnique({
    where: {
      slug,
    },
  });
  if (!event) {
    return notFound();
  }
  return event;
});
