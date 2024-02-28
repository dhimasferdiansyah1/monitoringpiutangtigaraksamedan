"use client";
import { deleteMainMonitoring } from "@/actions/actionMainMonitoring";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteStatusSerahDokumen } from "@/actions/actionStatusSerahDokumen";

export default function DeleteStatusSerahDokumen({ id }: { id: string }) {
  const { toast } = useToast();

  const handleDelete = async (formData: FormData) => {
    try {
      await deleteStatusSerahDokumen(id);
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
    <form action={handleDelete} className="h-full">
      <Button variant="destructive" className="p-1 h-full rounded-l-none">
        <Trash2 className="w-3 h-3" />
      </Button>
    </form>
  );
}
