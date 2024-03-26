import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
  formatISO,
  formatISO9075,
  parseISO,
} from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uuidModified() {
  const uuid = uuidv4().replace(/-/gi, "");
  return uuid.substr(uuid.length - 12);
}

export function uuidModifiedShort() {
  const uuid = uuidv4().replace(/-/gi, "");
  return uuid.substr(uuid.length - 5);
}

export const formatDateAndTimeIsoFetch = (from: string | undefined) => {
  // Handle empty input
  if (!from) {
    return "";
  }

  try {
    // Validate input format
    const parsedDate = parseISO(from);

    // Convert to UTC and then to Jakarta time
    const jakartaTime = utcToZonedTime(parsedDate, "Asia/Jakarta");

    // Format date and time in Jakarta time
    const formattedDate = format(jakartaTime, "dd/MM/yyyy");
    const formattedTime = format(jakartaTime, "HH:mm:ss");

    return `${formattedDate} ${formattedTime}`;
  } catch (error) {
    console.error(error);
    // Return default value or error message
    return "Invalid date and time format";
  }
};

export const formatDateIsoFetch = (from: string | undefined) => {
  if (!from) {
    return ""; // Kembalikan nilai kosong jika input tidak ada
  }

  try {
    // Validasi apakah nilai input sesuai format ISO 8601
    const parsedDate = parseISO(from);

    // Konversi ke Jakarta time
    const jakartaTime = utcToZonedTime(parsedDate, "Asia/Jakarta");

    // Format tanggal
    const formattedDate = format(jakartaTime, "dd/MM/yyyy");

    return formattedDate;
  } catch (error) {
    console.error(error);
    return "Tanggal tidak valid"; // Kembalikan pesan error untuk membantu debugging
  }
};

export const formatDateDistanceToNow = (from: string | undefined) => {
  if (!from) {
    return "Invalid date";
  }

  try {
    const parsedDate = parseISO(from);
    const now = new Date();

    const days = differenceInDays(now, parsedDate);
    const hours = differenceInHours(now, parsedDate) % 24;
    const minutes = differenceInMinutes(now, parsedDate) % 60;
    const seconds = differenceInSeconds(now, parsedDate) % 60;

    const parts: string[] = [];
    if (days > 0) {
      parts.push(`${days} hari`);
    }
    if (hours > 0) {
      parts.push(`${hours} jam`);
    }
    if (minutes > 0) {
      parts.push(`${minutes} menit`);
    }
    if (seconds > 0) {
      parts.push(`${seconds} detik`);
    }

    return parts.length > 0 ? parts.join(", ") : "0 detik";
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date format";
  }
};

export function generatePagination(cureentPage: number, totalPages: number) {
  if (totalPages < 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (cureentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (cureentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", cureentPage - 1, cureentPage, cureentPage + 1, totalPages];
}

export function formatRupiah(nilai: any) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(parseFloat(nilai ?? "") ?? 0);
}