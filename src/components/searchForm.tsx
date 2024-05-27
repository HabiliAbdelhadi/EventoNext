"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const searchSchema = z
  .string()
  // .min(1, { message: "Search query cannot be empty" })
  .max(25, { message: "Search query cannot be longer than 25 characters" })
  .refine((value) => /^[a-zA-Z0-9]*$/.test(value), {
    message: "Search query can't contain special characters",
  });

export default function SearchForm() {
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchSchema.safeParse(search).success) {
      router.push(`/events/${search}`);
    } else {
      setSearchError("Invalid search query. Please correct the input.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    const result = searchSchema.safeParse(newValue);
    if (!result.success) {
      setSearchError(result.error.errors[0].message);
    } else {
      setSearch(newValue);
      setSearchError("");
    }
  };
  return (
    <form className="w-full sm:w-[580px]" onSubmit={handleSubmit}>
      <input
        value={search}
        onChange={handleChange}
        className="h-16 w-full rounded-lg bg-white/[7%] px-6 outline-none ring-accent/50 transition focus:bg-white/10 focus:ring-2"
        placeholder="Search events in any city..."
        spellCheck={false}
      />
      {searchError ? (
        <small className="mt-2 text-red-600">{searchError}</small>
      ) : (
        <></>
      )}
    </form>
  );
}
