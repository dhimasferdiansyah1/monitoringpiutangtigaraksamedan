"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import LoadingButton from "../LoadingButton";
import { createCustomerList } from "@/actions/actionCustomer";
import { tambahRoleUserSchema } from "@/types/pilihrole";
import { METHODS } from "http";
import { useEffect, useState } from "react";
import { UserInfo } from "@prisma/client";
import { selectRole } from "@/actions/actionRole";

const roles = [
  "Sales",
  "Admin Sales",
  "Admin Gudang",
  "Driver",
  "Admin Inkaso",
  "Kolektor",
  "Kasir",
  "Area OTC",
];

export default function PilihRole() {
  const form = useForm<z.infer<typeof tambahRoleUserSchema>>({
    resolver: zodResolver(tambahRoleUserSchema),
    defaultValues: {
      role: "",
    },
  });

  const { toast } = useToast();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof tambahRoleUserSchema>) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await selectRole(formData);
      toast({
        description: "Data berhasil di kirim",
        variant: "default",
      });
    } catch (error) {
      toast({
        description: "Data gagal dikirim",
        variant: "destructive",
      });
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        noValidate
        className="space-y-6 lg:w-full w-3/4" // Adjust width as needed
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card className="space-y-4 p-8 my-8">
          <CardHeader className="-m-6 mb-2">
            <CardTitle>Pilih Role</CardTitle>
            <CardDescription>
              Silahkan mengisi role yang kamu gunakan
            </CardDescription>
          </CardHeader>
          <FormField
            control={control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Pilih Role</FormLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {roles.map((role) => (
                    <FormItem
                      key={role}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={role} />
                      </FormControl>
                      <FormLabel className="font-normal">{role}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
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
