"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DeliveryNoteSchema } from "@/types/deliveryNote";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import * as React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingButton from "../../LoadingButton";
import { createDeliveryNoteDetail } from "@/actions/actionDeliveryNote";
import { useToast } from "@/components/ui/use-toast";
import { UploadDropzone } from "@/utils/uploadthing";
import { Suspense, useState } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { DeliveryNote, PurchaseOrder } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function TambahDeliveryNote({
  deliveryNoteId,
}: {
  deliveryNoteId: DeliveryNote;
}) {
  const form = useForm<z.infer<typeof DeliveryNoteSchema>>({
    resolver: zodResolver(DeliveryNoteSchema),
    defaultValues: {
      no_dn: deliveryNoteId.no_dn || undefined,
      foto1_dn: deliveryNoteId.foto1_dn || undefined,
      foto2_dn: deliveryNoteId.foto2_dn || undefined,
    },
  });

  const { toast } = useToast();

  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");

  const [showP, setShowP] = useState(true);
  const hideP = () => {
    setShowP(false);
  };

  const [showP2, setShowP2] = useState(true);
  const hideP2 = () => {
    setShowP(false);
  };

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = form;

  const handleSubmitDeliveryNote = async (
    values: z.infer<typeof DeliveryNoteSchema>
  ) => {
    const formData = new FormData();
    const id = deliveryNoteId.id;

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await createDeliveryNoteDetail(formData, id, deliveryNoteId.id);
      toast({
        description: "Data berhasil di kirim",
        variant: "default",
      });
    } catch (error) {
      toast({
        description: "Data gagal di kirim",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      {deliveryNoteId ? (
        <form
          onSubmit={handleSubmit(handleSubmitDeliveryNote)}
          className="my-8 w-full sm:px-20 md:px-32 lg:max-w-3xl"
        >
          <Card className="space-y-4 p-8 dark:bg-zinc-900">
            <CardHeader className="-m-6 mb-2">
              <CardTitle>Tambah / Ubah Delivery Note</CardTitle>
              <CardDescription>
                Silahkan menambahkan atau mengubah data delivery note dibawah
                ini.
              </CardDescription>
            </CardHeader>
            <Suspense fallback={<p>Loading...</p>}>
              <FormField
                name="no_dn"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. Delivery Note</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="No. Delivery Note" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {deliveryNoteId.foto1_dn ? (
                <div className="my-4">
                  <p>Foto Delivery Note tersedia</p>
                  <Image
                    src={deliveryNoteId.foto1_dn || ""}
                    width={512}
                    height={512}
                    className="h-auto w-auto rounded-md"
                    alt="Foto purchase order lama"
                  />
                </div>
              ) : (
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  Tidak ada foto sebelum Delivery, silahkan mengupload!
                </p>
              )}

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
                  name="foto1_dn"
                  control={control}
                  render={({ field: { value, ...fieldValues } }) => (
                    <FormItem>
                      <Label>
                        Ubah/Upload Foto sebelum Delivery{" "}
                        <span className="text-muted-foreground">
                          (Max file: 8MB)
                        </span>
                      </Label>
                      <FormControl>
                        <UploadDropzone
                          className="p-8 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
                          config={{ mode: "auto" }}
                          appearance={{
                            button: "ut-ready:bg-zinc-400 bg-zinc-400 px-8",
                            container: "flex",
                            label: "text-muted-forground",
                          }}
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            setShowP(true);
                            setTimeout(hideP, 2000);

                            setImageUrl(res[0].url);
                            setValue("foto1_dn", res[0].url);
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

              {/* foto2_dn */}
              {deliveryNoteId.foto2_dn ? (
                <div className="my-4">
                  <p>Foto sesudah Delivery tersedia</p>
                  <Image
                    src={deliveryNoteId.foto2_dn || ""}
                    width={512}
                    height={512}
                    className="h-auto w-auto rounded-md"
                    alt="Foto purchase order lama"
                  />
                </div>
              ) : (
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  Tidak ada foto sesudah delivery, silahkan mengupload!
                </p>
              )}

              {imageUrl2 && (
                <Button
                  variant="secondary"
                  onClick={() => setImageUrl2("")}
                  type="button"
                  className="flex w-full gap-2"
                >
                  <Pencil className="h-5 w-5" />
                  <span>Ganti foto</span>
                </Button>
              )}
              {imageUrl2 ? (
                <div className="h-auto w-full">
                  {showP2 ? ( // Jika nilai showP adalah true
                    <p className="">Loading...</p> // Tampilkan <p>
                  ) : null}
                  <Image
                    src={imageUrl2}
                    alt="Foto purchase order"
                    width={512}
                    height={512}
                    className="h-auto w-full rounded border p-2"
                  />
                </div>
              ) : (
                <FormField
                  name="foto2_dn"
                  control={form.control}
                  render={({ field: { value, ...fieldValues } }) => (
                    <FormItem>
                      <Label>
                        Ubah/Upload Foto sesudah Delivery{" "}
                        <span className="text-muted-foreground">
                          (Max file: 8MB)
                        </span>
                      </Label>
                      <FormControl>
                        <UploadDropzone
                          className="p-8 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
                          config={{ mode: "auto" }}
                          appearance={{
                            button: "ut-ready:bg-zinc-400 bg-zinc-400 px-8",
                            container: "flex",
                            label: "text-muted-forground",
                          }}
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            setShowP2(true);
                            setTimeout(hideP2, 2000);

                            setImageUrl2(res[0].url);
                            form.setValue("foto2_dn", res[0].url);
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
            </Suspense>
            <LoadingButton
              loading={isSubmitting}
              className="w-full"
              type="submit"
            >
              Submit
            </LoadingButton>
          </Card>
        </form>
      ) : (
        <Skeleton className="h-[200px] w-[200px]" />
      )}
    </Form>
  );
}
