"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TambahPurchaseOrderSchema } from "@/types/purchaseOrder";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LiveSearchForward from "./SearchCustomerId";
import { CalendarIcon, Pencil } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/utils/uploadthing";
import LoadingButton from "../LoadingButton";
import { createPurchaseOrder } from "@/actions/actionTambahPurchaseOrder";

export default function FormTambahPurchaseOrder() {
  const form = useForm<z.infer<typeof TambahPurchaseOrderSchema>>({
    resolver: zodResolver(TambahPurchaseOrderSchema),
    defaultValues: {
      customer_id: "",
      no_po: "",
      tgl_po: "",
      foto_po: "",
      status_po: "Berjalan",
      status_serah: "Sales menerima purchase order dari toko",
      user: "Admin",
    },
  });

  const { toast } = useToast();

  const [imageUrl, setImageUrl] = useState("");

  const [showP, setShowP] = useState(true);
  const hideP = () => {
    setShowP(false);
  };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof TambahPurchaseOrderSchema>) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await createPurchaseOrder(formData);
      toast({
        description: "Data berhasil di kirim",
        variant: "default",
      });
    } catch (error) {
      toast({
        description: "Data gagal dikirim",
        variant: "destructive",
      });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full sm:px-20 md:px-32 lg:max-w-3xl"
      >
        <Card className="space-y-4 p-8 my-8">
          <CardHeader className="-m-6 mb-2">
            <CardTitle>Tambah Purchase Order</CardTitle>
            <CardDescription>
              Silahkan memilih account customer, mengisi nomor purchase order,
              dan lainnya dibawah ini.
            </CardDescription>
          </CardHeader>
          <FormField
            name="customer_id"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="customer_id">
                  Kode Account Customer
                </FormLabel>
                <FormControl>
                  <LiveSearchForward
                    {...field}
                    setFormValue={({ customer_id }: any) =>
                      form.setValue("customer_id", customer_id)
                    }
                    ref={field.ref}
                    onCustomerSelected={(customer_id: string) => {
                      form.setValue("customer_id", customer_id);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="no_po"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Purchase Order</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nomor Purchase Order..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="tgl_po"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Purchase Order</FormLabel>
                <div className="flex flex-col md:flex-row gap-4">
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Tanggal purchase order</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date?.toISOString())
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      field.onChange(new Date().toISOString());
                    }}
                  >
                    Hari ini
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {imageUrl && (
            <Button
              variant="secondary"
              onClick={() => setImageUrl("")}
              type="button"
              className="flex w-full gap-2"
            >
              <Pencil className="h-5 w-5" />
              <span>Ganti foto</span>
            </Button>
          )}
          {imageUrl ? (
            <div className="h-auto w-full">
              {showP ? ( // Jika nilai showP adalah true
                <p className="">Loading...</p> // Tampilkan <p>
              ) : null}
              <Image
                src={imageUrl}
                alt="Foto purchase order"
                width={512}
                height={512}
                className="h-auto w-full rounded border p-2"
              />
            </div>
          ) : (
            <FormField
              name="foto_po"
              control={form.control}
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <Label>
                    Foto Berkas Purchase Order{" "}
                    <span className="text-muted-foreground">
                      (Max file: 8MB)
                    </span>
                  </Label>
                  <FormControl>
                    <UploadDropzone
                      config={{ mode: "auto" }}
                      appearance={{
                        button: {
                          background: "black",
                        },
                        container: {
                          display: "flex",
                          color: "black",
                        },
                        label: {
                          color: "GrayText",
                        },
                      }}
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        setShowP(true);
                        setTimeout(hideP, 2000);

                        setImageUrl(res[0].url);
                        form.setValue("foto_po", res[0].url);
                      }}
                      onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            className="w-full"
          >
            Submit
          </LoadingButton>
        </Card>
      </form>
    </Form>
  );
}
