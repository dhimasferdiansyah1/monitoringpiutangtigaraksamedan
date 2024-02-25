export const dynamic = "force-dynamic";
export const revalidate = 0;
import { MainMonitoringList } from "@/components/(dashboard)/MainMonitoringList";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonDashboard from "@/components/ui/skeleton-dashboard";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div className="mx-auto my-6 max-w-7xl">
      <div className="container mx-auto px-0">
        <div className="flex flex-col">
          <h1 className="my-4 text-center text-2xl font-bold">
            Main Monitoring
          </h1>
          <div className="flex justify-end">
            <Link href="/dashboard/tambahpurchaseorder">
              <Button className="flex gap-2" variant="secondary">
                <PlusCircle className="w-4 h-4" />
                Tambah
              </Button>
            </Link>
          </div>
        </div>
        <div className="my-4 grid grid-cols-1 items-center justify-center gap-2 md:grid-cols-2 xl:grid-cols-3">
          <Suspense fallback={<SkeletonDashboard />}>
            <MainMonitoringList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
