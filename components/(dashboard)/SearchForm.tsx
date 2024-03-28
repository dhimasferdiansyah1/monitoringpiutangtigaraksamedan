"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";

export default function SearchForm() {
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <div className="relative flex flex-1">
      <Input
        type="text"
        className="w-full rounded-md border p-2 pl-10 duration-200 hover:border-zinc-300 hover:shadow dark:hover:border-zinc-600 hover:duration-200 dark:bg-zinc-900 dark:hover:shadow-zinc-800"
        placeholder="Cari No. Purchase Order/ Delivery Note/ Faktur..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
      />
      <Search className="absolute left-2 top-2 text-muted-foreground" />
    </div>
  );
}
