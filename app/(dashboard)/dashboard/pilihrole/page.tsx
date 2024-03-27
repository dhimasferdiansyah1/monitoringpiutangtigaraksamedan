import PilihRole from "@/components/(dashboard)/pilihrole/PilihRole";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
const pilihRole = dynamic(
  () => import("@/components/(dashboard)/pilihrole/PilihRole"),
  { loading: () => <Skeleton className="lg:h-full lg:w-full" /> }
);

export default function page() {
  return (
    <div className="mx-auto max-w-7xl my-6">
      <div className="container mx-auto px-0">
        <div className="flex flex-col items-center justify-center">
          <div>Role kamu adalah</div>
          <PilihRole />
        </div>
      </div>
    </div>
  );
}
