import { Skeleton } from "./skeleton";

import React from "react";

export default function SkeletonCustomer() {
  return (
    <>
      <Skeleton className="h-[50px] w-full rounded-md mt-4" />
      <Skeleton className="h-[50px] w-full rounded-md" />
      <Skeleton className="h-[50px] w-full rounded-md" />
    </>
  );
}
