import { Card } from "@/components/ui/card";

export default function StatusSerahDokumenCard() {
  return (
    <Card className="flex h-full w-full flex-col overflow-auto text-wrap p-4 shadow-none dark:bg-zinc-900">
      <div className="flex-col rounded-md border p-4">
        <div className="flex justify-between">
          <div className="flex gap-2 font-bold">
            <p>Username</p>
            <p className="hidden font-normal lg:flex">Role Job</p>
          </div>
          <p className="text-muted-foreground">10-02-2024</p>
        </div>
        <div className="lg:hidden">Role job</div>
        <div className="flex flex-col">
          <p className="text-muted-foreground">
            Admin inkaso menyerahkan dokumen ke kolektor untuk proses tukar
            faktur
          </p>
        </div>
      </div>
    </Card>
  );
}
