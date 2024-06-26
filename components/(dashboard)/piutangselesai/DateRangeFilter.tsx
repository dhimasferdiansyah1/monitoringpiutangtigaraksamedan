"use client";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ... existing code ...

export function DateRangeFilter() {
  const router = useRouter();
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);

    if (startDate) {
      searchParams.set("startDate", format(startDate, "yyyy-MM-dd"));
    } else {
      searchParams.delete("startDate");
    }

    if (endDate) {
      searchParams.set("endDate", format(endDate, "yyyy-MM-dd"));
    } else {
      searchParams.delete("endDate");
    }

    const newUrl = new URL(
      `${currentUrl.origin}${currentUrl.pathname}?${searchParams.toString()}`
    );
    router.push(newUrl.toString());
  };

  //reset
  const handleReset = () => {
    setStartDate(undefined);
    setEndDate(undefined);

    // Get current URL and search params
    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);

    // Remove date parameters
    searchParams.delete("startDate");
    searchParams.delete("endDate");

    // Build new URL and navigate
    const newUrl = new URL(
      `${currentUrl.origin}${currentUrl.pathname}?${searchParams.toString()}`
    );
    router.push(newUrl.toString());
  };

  return (
    <form onSubmit={handleFilter} className={cn("gap-2 flex")}>
      <div className=" flex flex-col lg:flex-row gap-2 items-center">
        <div className="flex gap-2 items-center">
          <label htmlFor="start" className="lg:hidden">
            Mulai
          </label>
          <input
            id="start"
            type="date"
            value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="input border rounded-md p-2"
          />
        </div>
        <span className="hidden lg:flex">-</span>
        <div className="flex gap-2 items-center">
          <label htmlFor="end" className="lg:hidden">
            Akhir
          </label>
          <input
            id="end"
            type="date"
            value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="input border rounded-md p-2"
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="secondary">
            Filter
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
}
