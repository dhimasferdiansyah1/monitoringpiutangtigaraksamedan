"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import * as React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useToast } from "@/components/ui/use-toast";

import { Suspense, useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { PurchaseOrder } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { statusSerahDokumenSchema } from "@/types/statusSerahDokumen";
import {
  createStatusSerahDokumenDetail,
  getStatusSerahDokumenUniqe,
} from "@/actions/actionStatusSerahDokumen";

export default function TambahStatusSerahDokumen({
  purchaseOrderId,
}: {
  purchaseOrderId: PurchaseOrder;
}) {
  const [statusSerahDokumen, setStatusSerahDokumen] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const status = await getStatusSerahDokumenUniqe(purchaseOrderId.id);
      const allStatus =
        status?.statusserahdokumen?.map(
          (item: { status_serah: any }) => item.status_serah
        ) || [];
      setStatusSerahDokumen(allStatus);
    }

    fetchData();
  }, [purchaseOrderId]);

  const form = useForm<z.infer<typeof statusSerahDokumenSchema>>({
    resolver: zodResolver(statusSerahDokumenSchema),
    defaultValues: {
      status_serah: "",
    },
  });

  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const handleSubmitStatusSerahDokumen = async (
    values: z.infer<typeof statusSerahDokumenSchema>
  ) => {
    const formData = new FormData();
    console.log(values);
    const id = purchaseOrderId.id;

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await createStatusSerahDokumenDetail(formData, id);
      toast({
        title: "Status Serah Dokumen berhasil di tambahkan",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Status Serah Dokumen gagal di tambahkan",
        variant: "default",
      });
    }
  };

  const ListStatusSerahDokumen = [
    { id: "01", status: "Sales menerima purchase order dari toko" },
    { id: "02", status: "Sales menyerahkan dokumen ke admin sales" },
    { id: "03", status: "Admin sales menyerahkan dokumen ke admin gudang" },
    { id: "04", status: "Admin gudang menyerahkan dokumen ke driver" },
    { id: "05", status: "Driver melakukan pengantaran barang" },
    { id: "06", status: "Driver sampai di toko" },
    { id: "07", status: "Driver selesai melakukan pengantaran barang" },
    { id: "08", status: "Driver menyerahkan dokumen ke admin gudang" },
    { id: "09", status: "Admin gudang menyerahkan dokumen ke admin sales" },
    { id: "10", status: "Admin sales menyerahkan dokumen ke admin inkaso" },
    {
      id: "11",
      status:
        "Admin inkaso menyerahkan dokumen ke kolektor untuk proses tukar faktur",
    },
    { id: "12", status: "Kolektor melakukan tukar faktur ke toko" },
    { id: "13", status: "Kolektor sampai di toko untuk proses tukar faktur" },
    { id: "14", status: "Kolektor selesai melakukan tukar faktur" },
    { id: "15", status: "Kolektor menyerahkan dokumen ke admin inkaso" },
    {
      id: "16",
      status:
        "Admin inkaso menyerahkan dokumen ke kolektor dalam proses panagihan ke toko",
    },
    { id: "17", status: "Kolektor melakukan penagihan piutang ke toko" },
    {
      id: "18",
      status: "Kolektor sampai di toko untuk proses penagihan piutang",
    },
    { id: "19", status: "Kolektor selesai melakukan penagihan piutang" },
    {
      id: "20",
      status:
        "Kolektor menyerahkan dokumen ke admin inkaso setelah selesai penagihan",
    },
    { id: "21", status: "Kolektor menyerahkan giro ke kasir" },
    { id: "22", status: "Kolektor menyerahkan tunai ke kasir" },
    { id: "23", status: "Kolektor menyerahkan transfer ke kasir" },
    { id: "24", status: "Kasir melakukan penyetoran ke bank" },
    { id: "25", status: "Kasir menyerahkan bukti penyetoran ke admin inkaso" },
    { id: "26", status: "Admin inkaso melakukan pelunasan piutang" },
  ];

  return (
    <Form {...form}>
      {purchaseOrderId ? (
        <form
          onSubmit={handleSubmit(handleSubmitStatusSerahDokumen)}
          className="my-8 w-full sm:px-20 md:px-32 lg:max-w-7xl"
        >
          <Card className="p-8 dark:bg-zinc-900 divide-y">
            <CardHeader className="-m-6 mb-2">
              <CardTitle>Tambah Status Serah Dokumen</CardTitle>
              <CardDescription>
                Silahkan menambahkan Status Serah Dokumen dibawah ini.
              </CardDescription>
            </CardHeader>
            {ListStatusSerahDokumen.map((status) => (
              // ...

              <FormField
                key={status.id}
                name="status_serah"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row gap-4 w-full justify-between p-1 items-center">
                      <FormControl>
                        <div className="flex gap-2">
                          {statusSerahDokumen.includes(status.status) ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <CheckCircle2 className="h-5 w-5 text-red-500" />
                          )}
                          {status.status}
                        </div>
                      </FormControl>
                      {statusSerahDokumen.includes(status.status) ? (
                        <Button
                          disabled
                          variant="outline"
                          onClick={() => {
                            field.onChange(status.status);
                          }}
                        >
                          Tambah
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => {
                            field.onChange(status.status);
                          }}
                        >
                          Tambah
                        </Button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </Card>
        </form>
      ) : (
        <Skeleton className="h-[200px] w-[200px]" />
      )}
    </Form>
  );
}
