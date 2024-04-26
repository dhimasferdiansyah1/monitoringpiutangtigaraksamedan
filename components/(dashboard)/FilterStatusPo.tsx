// (client component)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FilterDropdownProps {
  initialStatus?: string;
}

const FilterStatusPo: React.FC<FilterDropdownProps> = ({ initialStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState(initialStatus || "");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);

    // Get current URL
    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);

    // Update status_po parameter
    if (newStatus) {
      searchParams.set("status_po", newStatus);
    } else {
      searchParams.delete("status_po"); // Remove if "All Statuses" is selected
    }

    // Construct new URL with updated search params
    const newUrl = new URL(
      `${currentUrl.origin}${currentUrl.pathname}?${searchParams.toString()}`
    );

    // Navigate to the new URL
    router.push(newUrl.toString());
  };

  return (
    <select
      value={selectedStatus}
      onChange={handleChange}
      className="p-2 border rounded-md max-w-56 my-4 cursor-pointer"
    >
      <option value="">Semua Status</option>
      <option value="Baru">Baru</option>
      <option value="Pengantaran">Pengantaran</option>
      <option value="Tukar faktur">Tukar faktur</option>
      <option value="Penagihan">Penagihan</option>
      <option value="Pelunasan">Pelunasan</option>
    </select>
  );
};

export default FilterStatusPo;
