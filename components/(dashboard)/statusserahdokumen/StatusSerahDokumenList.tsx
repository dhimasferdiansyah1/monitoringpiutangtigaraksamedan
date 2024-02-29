import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CheckCircle2, Clock, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getStatusSerahDokumenList } from "@/actions/actionStatusSerahDokumen";
import { formatDateDistanceToNow } from "@/lib/utils";
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StatusSerahDokumenList() {
  const statusList = await getStatusSerahDokumenList();
  return (
    <Table className="mx-auto mt-4 w-[512px] rounded-md lg:w-full">
      <TableCaption>List data serah dokumen</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="px-4 py-2">No.</TableHead>
          <TableHead className="px-4 py-2">Status Serah Dokumen</TableHead>
          <TableHead className="px-4 py-2">User</TableHead>
          <TableHead className="px-4 py-2">Role</TableHead>
          <TableHead className="px-4 py-2">No. Purchase Order</TableHead>
          <TableHead className="px-4 py-2">Ditambahkan</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {statusList ?? [].length > 0 ? (
          statusList?.map((item, index) => (
            <Suspense
              fallback={<Skeleton className="h-10 w-10" />}
              key={item.id}
            >
              <TableRow key={item.id}>
                <TableCell className="px-4 py-2 text-left font-medium">
                  {index + 1}
                </TableCell>
                <TableCell
                  aria-label="account customer"
                  className="px-4 py-2 flex gap-2"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  {item.status_serah}
                </TableCell>
                <TableCell aria-label="nama customer" className="px-4 py-2">
                  {item.user}
                </TableCell>
                <TableCell
                  aria-label="alamat customer"
                  className="px-4 py-2 sm:table-cell"
                >
                  {item.role}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {item.purchase_order.no_po}
                </TableCell>
                <TableCell className="px-4 py-2 flex gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {formatDateDistanceToNow(item.createdAt.toISOString())} yang
                  lalu
                </TableCell>
              </TableRow>
            </Suspense>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="px-4 py-2 text-center">
              Tidak ada data status serah dokumen yang tersedia.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
