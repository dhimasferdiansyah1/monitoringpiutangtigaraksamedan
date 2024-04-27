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
import { useToast } from "@/components/ui/use-toast";
import { UploadDropzone } from "@/utils/uploadthing";
import { Suspense, useState } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { BuktiPelunasan } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { editBuktiPelunasanSchema } from "@/types/buktiPelunasan";
import { createBuktiPelunasanDetail } from "@/actions/actionBuktiPelunasan";

export default function TambahBuktiPelunasan({
  buktiPelunasanId,
}: {
  buktiPelunasanId: BuktiPelunasan;
}) {
  const form = useForm<z.infer<typeof editBuktiPelunasanSchema>>({
    resolver: zodResolver(editBuktiPelunasanSchema),
    defaultValues: {
      no_bp: buktiPelunasanId.no_bp || undefined,
      foto_bp: buktiPelunasanId.foto_bp || undefined,
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
    setValue,
    formState: { isSubmitting },
  } = form;

  const handleSubmitFakturPajak = async (
    values: z.infer<typeof editBuktiPelunasanSchema>
  ) => {
    const formData = new FormData();
    const id = buktiPelunasanId.id;

    Object.entries(values).forEach(([key, value]) => {
      if (value) formData.append(key, String(value));
    });

    try {
      await createBuktiPelunasanDetail(formData, id);
      toast({
        description: "Data berhasil di kirim",
        variant: "default",
      });
    } catch (error) {
      console.error(error);
      toast({
        description: "Data gagal di kirim",
        variant: "destructive",
      });
    }
  };
  return (
    <Form {...form}>
      {buktiPelunasanId ? (
        <form
          onSubmit={handleSubmit(handleSubmitFakturPajak)}
          className="my-8 w-full sm:px-20 md:px-32 lg:max-w-3xl"
        >
          <Card className="space-y-4 p-8 dark:bg-zinc-900">
            <CardHeader className="-m-6 mb-2">
              <CardTitle>Tambah / Ubah Bukti Pelunasan</CardTitle>
              <CardDescription>
                Silahkan menambahkan atau mengubah bukti pelunasan dibawah ini.
              </CardDescription>
            </CardHeader>
            <Suspense fallback={<p>Loading...</p>}>
              <FormField
                name="no_bp"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. Bukti Pelunasan</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        placeholder="No. Faktur Pajak"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {buktiPelunasanId.foto_bp ? (
                <div className="my-4">
                  <p>Foto bukti pelunasan tersedia</p>
                  <Image
                    src={buktiPelunasanId.foto_bp || ""}
                    width={512}
                    height={512}
                    className="h-auto w-auto rounded-md"
                    alt="Foto purchase order lama"
                  />
                </div>
              ) : (
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  Tidak ada foto bukti peluansan, silahkan mengupload!
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
                  name="foto_bp"
                  control={control}
                  render={({ field: { value, ...fieldValues } }) => (
                    <FormItem>
                      <Label>
                        Ubah/Upload Foto Bukti Pelunasan{" "}
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
                            setValue("foto_bp", res[0].url);
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
