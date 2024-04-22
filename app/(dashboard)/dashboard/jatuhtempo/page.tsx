import SearchForm from "@/components/(dashboard)/SearchForm";
import { Metadata } from "next";
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Jatuh Tempo",
};

export default async function JatuhTempoPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    search?: string;
  };
}) {
  return (
    <div className="mx-auto my-6 max-w-7xl">
      <div className="container mx-auto xl:px-0">
        <div className="flex flex-col">
          <div className="flex ju</div>stify-end"></div>
        </div>
        <div className="flex flex-col text-center">
          <p>Silahkan memilih jatuh tempo</p>
        </div>
      </div>
    </div>
  );
}
