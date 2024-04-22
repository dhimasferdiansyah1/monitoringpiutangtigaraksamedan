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
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getCustomerList,
  getCustomerListPages,
} from "@/actions/actionCustomer";
import DeleteCustomerList from "./DeleteCustomerList";
import Pagination from "../Pagination";
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CustomerList({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    search?: string;
  };
}) {
  const query = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;
  const customerList = await getCustomerList(currentPage, query);
  const totalPages = await getCustomerListPages(query);

  return (
    <>
      <p className="lg:pl-4 text-sm text-muted-foreground">
        Total : {customerList?.length}
      </p>

      <Table className="mx-auto mt-4 w-[512px] rounded-md lg:w-full">
        <TableCaption>List data customer key account modern</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2">No.</TableHead>
            <TableHead className="px-4 py-2">Account</TableHead>
            <TableHead className="px-4 py-2">Customer Name</TableHead>
            <TableHead className="px-4 py-2">Alamat</TableHead>
            <TableHead className="px-4 py-2">No. Telp</TableHead>
            <TableHead className="px-4 py-2">Email</TableHead>
            <TableHead className="px-4 py-2">
              Purchase Order Yang Dimiliki
            </TableHead>
            <TableHead className="px-4 py-2">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customerList?.length > 0 ? (
            customerList?.map((item, index) => (
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
                    className="px-4 py-2"
                  >
                    {item.account}
                  </TableCell>
                  <TableCell aria-label="nama customer" className="px-4 py-2">
                    {item.customer_name}
                  </TableCell>
                  <TableCell
                    aria-label="alamat customer"
                    className="px-4 py-2 sm:table-cell"
                  >
                    {item.alamat}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {item.no_telp ? item.no_telp : "-"}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {item.email ? item.email : "-"}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {item.purchase_order.length}
                  </TableCell>
                  <TableCell className=" px-4 py-2 text-right">
                    <div className="flex gap-4">
                      <Link
                        href={`/dashboard/customer/editcustomer/${item.id}`}
                        className="flex gap-2 rounded-md bg-muted px-3 py-2"
                      >
                        Edit
                        <Pencil className="hover:text-primary-400 h-4 w-4 cursor-pointer text-primary transition-colors duration-300 ease-in-out hover:text-muted-foreground" />
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger
                          name="delete"
                          className="rounded-md bg-destructive p-2"
                        >
                          <Trash2 className="h-4 w-4 cursor-pointer text-white transition-colors duration-300 ease-in-out hover:text-red-200" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Jika kamu setuju untuk menghapus, maka tindakan
                              ini tidak bisa dibatalkan.
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Ini akan menghapus keseluruhan purchase order dan
                              semua data terkait purchase order yang dimiliki
                              customer{" "}
                              <span className="text-destructive">
                                {item.customer_name}
                              </span>{" "}
                              dengan kode account customer{" "}
                              <span className="text-muted-foreground">
                                ({item.account})
                              </span>{" "}
                              ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <DeleteCustomerList id={item.id} />
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              </Suspense>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="px-4 py-2 text-center">
                Tidak ada data customer yang tersedia.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination totalPages={totalPages} />
    </>
  );
}

