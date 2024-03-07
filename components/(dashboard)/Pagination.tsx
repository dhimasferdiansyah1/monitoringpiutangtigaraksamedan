"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import cslx from "clsx";
import { generatePagination } from "@/lib/utils";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cureentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: String | Number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  const allPages = generatePagination(cureentPage, totalPages);

  const PaginationNumber = ({
    page,
    href,
    position,
    isActive,
  }: {
    page: number | string;
    href: string;
    position?: "first" | "last" | "middle" | "single";
    isActive: boolean;
  }) => {
    const className = cslx(
      "flex h-10 w-10 items-center justify-center text-sm",
      {
        "rounded-lg": position === "first" || position === "last",

        "z-10 border rounded-lg": isActive,
        "hover:bg-zinc-100 rounded-lg": !isActive && position !== "middle",
        "text-zinc-900 pointer-events-none": position === "middle",
      }
    );

    return isActive && position === "middle" ? (
      <div className={className}>{page}</div>
    ) : (
      <Link href={href} className={className}>
        {page}
      </Link>
    );
  };

  const PaginationArrow = ({
    href,
    direction,
    isDisabled,
  }: {
    href: string;
    direction: "left" | "right";
    isDisabled?: boolean;
  }) => {
    const className = cslx(
      "flex h-10 w-10 items-center justify-center text-sm",
      {
        "pointer-event-none text-muted-foreground": isDisabled,
        "hover:bg-gray-100": !isDisabled,
        "mr-2": direction === "left",
        "ml-2": direction === "right",
      }
    );

    const icon =
      direction === "left" ? (
        <ChevronLeft size={20} />
      ) : (
        <ChevronRight size={20} />
      );

    return isDisabled ? (
      <div className={className}>{icon}</div>
    ) : (
      <Link href={href} className={className}>
        {icon}
      </Link>
    );
  };

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        href={createPageURL(cureentPage - 1)}
        isDisabled={cureentPage <= 1}
      />
      <div className="flex gap-1">
        {allPages.map((page, index) => {
          let position: "first" | "last" | "middle" | "single" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={index}
              page={page}
              href={createPageURL(page)}
              position={position}
              isActive={cureentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(cureentPage + 1)}
        isDisabled={cureentPage >= totalPages}
      />
    </div>
  );
}
