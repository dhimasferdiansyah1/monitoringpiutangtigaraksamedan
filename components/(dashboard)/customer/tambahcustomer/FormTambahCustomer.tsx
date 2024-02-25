"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { tambahCustomerSchema } from "@/types/customer";
import LoadingButton from "../../LoadingButton";
import { createCustomerList } from "@/actions/actionCustomer";

export default function FormTambahCustomer() {
  const form = useForm<z.infer<typeof tambahCustomerSchema>>({
    resolver: zodResolver(tambahCustomerSchema),
    defaultValues: {
      customer_name: "",
      account: "",
      alamat: "",
      no_telp: "",
      email: "",
    },
  });

  const { toast } = useToast();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof tambahCustomerSchema>) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await createCustomerList(formData);
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
        noValidate
        className="w-full sm:px-20 md:px-32 lg:max-w-3xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card className="space-y-4 p-8 my-8">
          <CardHeader className="-m-6 mb-2">
            <CardTitle>Tambah Customer</CardTitle>
            <CardDescription>
              Silahkan mengisi data customer key account modern dibawah
            </CardDescription>
          </CardHeader>
          <FormField
            control={control}
            name="account"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. Account</FormLabel>
                <FormControl>
                  <Input placeholder="Nomor Account..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="customer_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Customer</FormLabel>
                <FormControl>
                  <Input placeholder="Nama Customer..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="alamat"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Alamat..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="no_telp"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nomor telepon{" "}
                  <span className="text-muted-foreground">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="tel" placeholder="Nomor telepon..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email{" "}
                  <span className="text-muted-foreground">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="Email..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            loading={isSubmitting}
            className="w-full"
            type="submit"
          >
            Submit
          </LoadingButton>
        </Card>
      </form>
    </Form>
  );
}
