// RefreshButton.tsx (client component)
"use client";

import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";

const RefreshButton = () => {
  const router = useRouter();

  const handleRefresh = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("refreshKey", Date.now().toString()); // Add timestamp as refresh key

    const newUrl = new URL(
      `${window.location.origin}${
        window.location.pathname
      }?${searchParams.toString()}`
    );

    router.push(newUrl.toString());
  };

  return (
    <button onClick={handleRefresh} className=" p-2 rounded-md border">
      <RefreshCcw className="w-4 h-4" />
    </button>
  );
};

export default RefreshButton;
