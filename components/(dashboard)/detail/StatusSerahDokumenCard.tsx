import { Card } from "@/components/ui/card";
import Link from "next/link";
import { getAllDetail } from "@/actions/actionDetail";
import { Button } from "@/components/ui/button";
import { formatDateAndTimeIsoFetch } from "@/lib/utils";
import DeleteStatusSerahDokumen from "./statusserahdokumen/DeleteStatusSerahDokumen";
import { auth, currentUser } from "@clerk/nextjs";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StatusSerahDokumenCard({
  params,
}: {
  params: { id: string };
}) {
  const statusserahdokumen = await getAllDetail(params.id);
  const { userId } = auth();
  const user = await currentUser();
  if (!statusserahdokumen) {
    return <p>Tidak ada status serah dokumen</p>;
  }
  return (
    <Card className="flex h-full w-full flex-col gap-2 overflow-auto text-wrap p-4 shadow-none dark:bg-zinc-900">
      {statusserahdokumen.statusserahdokumen?.map((status) => (
        <div key={statusserahdokumen.id} className="flex w-full items-center">
          <div
            className="flex-col rounded-md rounded-r-none border p-4 w-full"
            key={statusserahdokumen.id}
          >
            <div className="flex justify-between">
              <div className="flex gap-2 font-bold">
                <p>{status.user}</p>
                <p className="hidden font-normal lg:flex">{status.role}</p>
              </div>
              <p className="text-muted-foreground">
                {formatDateAndTimeIsoFetch(status.createdAt.toISOString())}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-muted-foreground">{status.status_serah}</p>
            </div>
          </div>
          <DeleteStatusSerahDokumen id={status.id} />
        </div>
      ))}

      <div className="flex justify-center my-4">
        <Link
          href={`/dashboard/detail/${statusserahdokumen.id}/statusserahdokumen/${statusserahdokumen.id}`}
        >
          <Button variant="secondary">Tambah Status Serah Dokumen</Button>
        </Link>
      </div>
    </Card>
  );
}
