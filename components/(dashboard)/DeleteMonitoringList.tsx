"use client";
import { deleteMainMonitoring } from "@/actions/actionMainMonitoring";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

export default function DeleteMainMonitoringList({ id }: { id: string }) {
  const { toast } = useToast();

  const handleDelete = async (formData: FormData) => {
    try {
      await deleteMainMonitoring(id);
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
