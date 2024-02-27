import { getAllDetail } from "@/actions/actionDetail";
import { Card } from "@/components/ui/card";

export default async function CustomerCard({
  params,
}: {
  params: { id: string };
}) {
  const customer = await getAllDetail(params.id);
  if (!customer) {
    return <p>Customer note not found</p>;
  }
  return (
    <Card className="flex h-1/5 min-h-max w-full flex-col overflow-auto text-wrap p-4 shadow-none dark:bg-zinc-900">
      <div className="flex items-start gap-2">
        <p className="min-w-12 max-w-24 text-balance">Nama Customer</p>
        <span>:</span>
        <div className=" break-all text-muted-foreground">
          {customer.customer.customer_name || (
            <p className="text-destructive">Tidak memiliki</p>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <p className="min-w-24 break-all">Account</p>
        <span>:</span>
        <div className=" break-all text-muted-foreground">
          {customer.customer.account || (
            <p className="text-destructive">Tidak memiliki</p>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <p className="min-w-24 break-all">Alamat</p>
        <span>:</span>
        <div>
          <div className=" break-all text-muted-foreground">
            {customer.customer.alamat || (
              <span className="text-destructive">Tidak memiliki</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <p className="min-w-24 break-all">Telepon</p>
        <span>:</span>
        <div>
          <div className=" break-all text-muted-foreground">
            {customer.customer.no_telp || (
              <span className="text-destructive">Tidak memiliki</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <p className="min-w-24 break-all">Email</p>
        <span>:</span>
        <div>
          <div className="break-all text-muted-foreground">
            {customer.customer.email || (
              <span className="text-destructive">Tidak memiliki</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
