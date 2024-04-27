import { getAllDetail } from "@/actions/actionDetail";
import { notFound } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function CheckLengkap({
  params,
}: {
  params: { Id: string };
}) {
  const id = params.Id;
  const detail = await getAllDetail(id);

  if (!detail) {
    return notFound();
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="cursor-default">
            {detail?.no_po && detail.tgl_po && detail.foto_po ? (
              <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                Purchase Order ✅
              </div>
            ) : (
              <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                Purchase Order ❌
              </div>
            )}
          </TooltipTrigger>
          <TooltipContent>
            {detail?.no_po && detail.tgl_po && detail.foto_po ? (
              <div className="text-sm flex items-center gap-2">Lengkap ✅</div>
            ) : (
              <div className="text-sm flex items-center gap-2">
                Belum Lengkap ❌
              </div>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="cursor-default">
            {detail?.delivery_note?.no_dn &&
            detail.delivery_note.foto1_dn &&
            detail.delivery_note.foto2_dn ? (
              <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                Delivery Note ✅
              </div>
            ) : (
              <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                Delivery Note ❌
              </div>
            )}
          </TooltipTrigger>
          <TooltipContent>
            {detail?.delivery_note?.no_dn &&
            detail.delivery_note.foto1_dn &&
            detail.delivery_note.foto2_dn ? (
              <div className="text-sm flex items-center gap-2">Lengkap ✅</div>
            ) : (
              <div className="text-sm flex items-center gap-2">
                Belum Lengkap ❌
              </div>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="cursor-default">
            {detail?.faktur?.no_fk &&
            detail.faktur.tgl_fk &&
            detail.faktur.tgl_jt &&
            detail.faktur.nilai &&
            detail.faktur.foto1_fk &&
            detail.faktur.foto2_fk ? (
              <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                Faktur ✅
              </div>
            ) : (
              <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                Faktur ❌
              </div>
            )}
          </TooltipTrigger>
          <TooltipContent>
            {detail?.faktur?.no_fk &&
            detail.faktur.tgl_fk &&
            detail.faktur.tgl_jt &&
            detail.faktur.nilai &&
            detail.faktur.foto1_fk &&
            detail.faktur.foto2_fk ? (
              <div className="text-sm flex items-center gap-2">Lengkap ✅</div>
            ) : (
              <div className="text-sm flex items-center gap-2">
                Belum Lengkap ❌
              </div>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="cursor-default">
            {detail?.faktur_pajak?.no_fkp &&
            detail.faktur_pajak.tgl_fkp &&
            detail.faktur_pajak.foto_fkp ? (
              <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                Faktur Pajak ✅
              </div>
            ) : (
              <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                Faktur Pajak ❌
              </div>
            )}
          </TooltipTrigger>
          <TooltipContent>
            {detail?.faktur_pajak?.no_fkp &&
            detail.faktur_pajak.tgl_fkp &&
            detail.faktur_pajak.foto_fkp ? (
              <div className="text-sm flex items-center gap-2">Lengkap ✅</div>
            ) : (
              <div className="text-sm flex items-center gap-2">
                Belum Lengkap ❌
              </div>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="cursor-default">
            {detail?.tandaterimatagihan?.no_penagihan &&
            detail.tandaterimatagihan.status &&
            detail.tandaterimatagihan.tgl_jt &&
            detail.tandaterimatagihan.foto_ttt ? (
              <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                Tanda Terima Tagihan ✅
              </div>
            ) : (
              <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                Tanda Terima Tagihan ❌
              </div>
            )}
          </TooltipTrigger>
          <TooltipContent>
            {detail?.tandaterimatagihan?.no_penagihan &&
            detail.tandaterimatagihan.status &&
            detail.tandaterimatagihan.tgl_jt &&
            detail.tandaterimatagihan.foto_ttt ? (
              <div className="text-sm flex items-center gap-2">Lengkap ✅</div>
            ) : (
              <div className="text-sm flex items-center gap-2">
                Belum Lengkap ❌
              </div>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="cursor-default">
            {detail?.buktipelunasan?.no_bp &&
            detail.buktipelunasan.createdAt &&
            detail.buktipelunasan.foto_bp ? (
              <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                Bukti Pelunasan ✅
              </div>
            ) : (
              <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                Bukti Pelunasan ❌
              </div>
            )}
          </TooltipTrigger>
          <TooltipContent>
            {detail?.buktipelunasan?.no_bp &&
            detail.buktipelunasan.createdAt &&
            detail.buktipelunasan.foto_bp ? (
              <div className="text-sm flex items-center gap-2">Lengkap ✅</div>
            ) : (
              <div className="text-sm flex items-center gap-2">
                Belum Lengkap ❌
              </div>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
