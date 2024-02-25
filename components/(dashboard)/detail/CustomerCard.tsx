import { getCustomerUniqe } from "@/actions/actionCustomer";
import { Card } from "@/components/ui/card";
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CustomerCard({
  customerId,
}: {
  customerId: string;
}) {
  const customer = await getCustomerUniqe(customerId);
  return (
    <Card className="flex h-1/5 min-h-fit w-full flex-col overflow-auto text-wrap p-4 shadow-none dark:bg-zinc-900">
      <div className="flex items-start gap-2">
        <p className="min-w-12 max-w-24 text-balance">Nama Customer</p>
        <span>:</span>
        <div className=" break-all text-muted-foreground">
          {customer?.customer_name || (
            <p className="text-destructive">Tidak memiliki</p>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <p className="min-w-24 break-all">Account</p>
        <span>:</span>
        <div className=" break-all text-muted-foreground">
          {customer?.account || (
            <p className="text-destructive">Tidak memiliki</p>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <p className="min-w-24 break-all">Alamat</p>
        <span>:</span>
        <div>
          <div className=" break-all text-muted-foreground">
            {customer?.alamat || (
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
            {customer?.no_telp || (
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
            {customer?.email || (
              <span className="text-destructive">Tidak memiliki</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
