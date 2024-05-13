"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function MonthYearRangeFilter() {
  const router = useRouter();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = React.useState(currentMonth);
  const [selectedYear, setSelectedYear] = React.useState(currentYear);

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);
    searchParams.set("month", selectedMonth.toString());
    searchParams.set("year", selectedYear.toString());
    const newUrl = new URL(
      `${currentUrl.origin}${currentUrl.pathname}?${searchParams.toString()}`
    );
    router.push(newUrl.toString());
  };

  // Reset filter
  const handleReset = () => {
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
    // Get current URL and search params
    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);
    // Remove date parameters
    searchParams.delete("month");
    searchParams.delete("year");
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
          <label htmlFor="month" className="lg:hidden">
            Bulan
          </label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
            className="input border rounded-md p-2"
          >
            <option value="">Pilih Bulan</option>
            {[...Array(12)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="year" className="lg:hidden">
            Tahun
          </label>
          <input
            id="year"
            type="number"
            min="1900" // Batasi tahun minimum, sesuaikan jika perlu
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
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
