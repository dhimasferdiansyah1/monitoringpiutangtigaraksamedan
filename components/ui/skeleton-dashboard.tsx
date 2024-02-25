import { Skeleton } from "./skeleton";

import React from "react";

export default function SkeletonDashboard() {
  return (
    <>
      <Skeleton className="w-full h-[315px]" />
      <Skeleton className="w-full h-[315px]" />
      <Skeleton className="w-full h-[315px]" />
    </>
  );
}
