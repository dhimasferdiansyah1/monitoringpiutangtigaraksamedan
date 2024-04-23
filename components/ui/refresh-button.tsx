// RefreshButton.tsx (client component)
"use client";

import { RefreshCcw } from "lucide-react";

const RefreshButton = () => {
  const handleRefresh = () => {
    window.location.reload(); // Reload the current page
  };

  return (
    <button onClick={handleRefresh} className="p-2 rounded-md border">
      <RefreshCcw className="w-4 h-4" />
    </button>
  );
};

export default RefreshButton;
