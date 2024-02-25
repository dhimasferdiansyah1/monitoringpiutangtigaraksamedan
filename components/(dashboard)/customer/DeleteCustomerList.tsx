"use client";
import { deleteCustomerList } from "@/actions/actionCustomer";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export default function DeleteCustomerList({ id }: { id: string }) {
  const { toast } = useToast();

  const handleDelete = async (formData: FormData) => {
    try {
      await deleteCustomerList(id);
      toast({
        description: "Data berhasil dihapus",
      });
    } catch (error) {
      toast({
        description: "Data gagal dihapus",
        variant: "destructive",
      });
    }
  };

  return (
    <form action={handleDelete}>
      <Button className="w-full">Lanjut</Button>
    </form>
  );
}
