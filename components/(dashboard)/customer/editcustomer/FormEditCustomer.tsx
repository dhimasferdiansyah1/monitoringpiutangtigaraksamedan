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
import { updateCustomerList } from "@/actions/actionCustomer";
import { Customer } from "@prisma/client";

export default function FormEditCustomer({ customer }: { customer: Customer }) {
  const form = useForm<z.infer<typeof tambahCustomerSchema>>({
    resolver: zodResolver(tambahCustomerSchema),
    defaultValues: {
      customer_name: customer.customer_name,
      account: customer.account,
      alamat: customer.alamat,
      no_telp: customer.no_telp || undefined,
      email: customer.email || undefined,
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
      await updateCustomerList(customer.id, formData);
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
            <CardTitle>Edit Customer</CardTitle>
            <CardDescription>
              Silahkan mengubah customer key account modern dibawah
            </CardDescription>
          </CardHeader>
          <FormField
            name="customer_name"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Customer</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nama Customer..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="account"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode Account Customer</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Kode Account Customer..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="alamat"
            control={control}
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
            control={control}
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
            control={control}
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
