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
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { TandaTerimaTagihan } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { createFakturDetail } from "@/actions/actionFaktur";
import { editfakturPajakSchema } from "@/types/fakturPajak";
import { editTandaTerimaTagihanSchema } from "@/types/tandaTerimaTagihan";
import { createTandaTerimaTagihanDetail } from "@/actions/actionTandaTerimaTagihan";
import Select from "@/components/ui/select";

export default function TambahTandaTerimaTagihan({
  tandaTerimaTagihanId,
}: {
  tandaTerimaTagihanId: TandaTerimaTagihan;
}) {
  const form = useForm<z.infer<typeof editTandaTerimaTagihanSchema>>({
    resolver: zodResolver(editTandaTerimaTagihanSchema),
    defaultValues: {
      no_penagihan: tandaTerimaTagihanId.no_penagihan || undefined,
      status: tandaTerimaTagihanId.status || undefined,
      tgl_jt:
        tandaTerimaTagihanId.tgl_jt === null
          ? undefined
          : tandaTerimaTagihanId.tgl_jt,
      foto_ttt: tandaTerimaTagihanId.foto_ttt || undefined,
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

  const handleSubmitTandaTerimaTagihan = async (
    values: z.infer<typeof editTandaTerimaTagihanSchema>
  ) => {
    const formData = new FormData();
    const id = tandaTerimaTagihanId.id;

    Object.entries(values).forEach(([key, value]) => {
      if (value) formData.append(key, String(value));
    });

    try {
      await createTandaTerimaTagihanDetail(formData, id);
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
      {tandaTerimaTagihanId ? (
        <form
          onSubmit={handleSubmit(handleSubmitTandaTerimaTagihan)}
          className="my-8 w-full sm:px-20 md:px-32 lg:max-w-3xl"
        >
          <Card className="space-y-4 p-8 dark:bg-zinc-900">
            <CardHeader className="-m-6 mb-2">
              <CardTitle>Tambah / Ubah Tanda Terima Tagihan</CardTitle>
              <CardDescription>
                Silahkan menambahkan atau mengubah Tanda Terima Tagihan dibawah
                ini.
              </CardDescription>
            </CardHeader>
            <Suspense fallback={<p>Loading...</p>}>
              <FormField
                name="no_penagihan"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. Penagihan</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        placeholder="No. Penagihan"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="tgl_jt"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Jatuh Tempo Penagihan</FormLabel>
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
                                  format(new Date(field.value), "PPP") // Convert the string value to a Date object
                                ) : (
                                  <span>Tanggal Jatuh Tempo Penagihan</span>
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
              <FormField
                name="status"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select {...field} defaultValue="">
                        <option value="" hidden>
                          Pilih Status
                        </option>
                        <option value="belum_selesai">Belum Selesai</option>
                        <option value="selesai">Selesai</option>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {tandaTerimaTagihanId.foto_ttt ? (
                <div className="my-4">
                  <p>Foto Tanda Terima Tagihan tersedia</p>
                  <Image
                    src={tandaTerimaTagihanId.foto_ttt || ""}
                    width={512}
                    height={512}
                    className="h-auto w-auto rounded-md"
                    alt="Foto purchase order lama"
                  />
                </div>
              ) : (
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  Tidak ada foto Tanda Terima Tagihan, silahkan mengupload!
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
                    alt="Foto Tanda Terima Tagihan"
                    width={512}
                    height={512}
                    className="h-auto w-full rounded border p-2"
                  />
                </div>
              ) : (
                <FormField
                  name="foto_ttt"
                  control={control}
                  render={({ field: { value, ...fieldValues } }) => (
                    <FormItem>
                      <Label>
                        Ubah/Upload Foto Tanda Terima Tagihan{" "}
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
                            setValue("foto_ttt", res[0].url);
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
