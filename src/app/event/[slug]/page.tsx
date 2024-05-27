import H1 from "@/components/H1";
import { getEvent } from "@/lib/server-utils";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;
  const event = await getEvent(slug);
  return {
    title: ` ${event.name} -- Evento`,
    description: `${event.description}`,
  };
}
export async function generateStaticParams() {
  return [
    {
      slug: "comedy-extravaganza",
    },
    {
      slug: "dj-practice-session",
    },
  ];
}
export default async function EventPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const event = await getEvent(slug);

  return (
    <main>
      <section className="relative flex items-center justify-center overflow-hidden py-14 md:py-20">
        <Image
          src={event.imageUrl}
          alt="Event Background Image"
          fill
          quality={50}
          sizes="(max-width:1280px) 100vw,1280px"
          className="z-0 object-cover blur-3xl"
          priority
        />
        <div className="z-1 lg:gap-x-26 relative flex flex-col gap-x-6 md:flex-row">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={200}
            className="rounded-xl border-2 border-white/50 object-cover"
          />
          <div className="flex flex-col">
            <p className="text-white/75">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
              {event.name}
            </H1>
            <p className="whitespace-nowrap text-xl text-white/75">
              Organised by <span className="italic">{event.organizerName}</span>
            </p>
            <button className="border-white-10 state-effects mt-5 w-[95w] rounded-md border-2 bg-white/20 py-2 text-lg capitalize sm:w-full md:mt-auto">
              Get Tickets
            </button>
          </div>
        </div>
      </section>

      <div className="min-h-[75vh] px-5 py-16 text-center">
        <Section>
          <SectionHeading>About this Event</SectionHeading>
          <SectionContent>{event.description}</SectionContent>
        </Section>
        <Section>
          <SectionHeading>Location</SectionHeading>
          <SectionContent>{event.location}</SectionContent>
        </Section>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-12">{children}</section>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-8 text-2xl">{children}</h2>;
}

function SectionContent({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-white-75 mx-auto max-w-4xl text-lg leading-8 ">
      {children}
    </p>
  );
}
