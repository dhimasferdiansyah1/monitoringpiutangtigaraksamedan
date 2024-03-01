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
  try {
    const parsedDate = parseISO(from ?? "");
    const formattedDate = format(parsedDate, "dd/MM/yyyy");
    const formattedTime = format(parsedDate, "HH:mm:ss");
    return `${formattedDate} ${formattedTime}`;
  } catch {}
};

export const formatDateIsoFetch = (from: string | undefined) => {
  try {
    // Parse the ISO string into a Date object
    const parsedDate = parseISO(from ?? "");

    // Convert the parsed date from UTC to Jakarta time
    const jakartaTime = utcToZonedTime(parsedDate, "Asia/Jakarta");

    // Format the Jakarta time as "dd/MM/yyyy"
    const formattedDate = format(jakartaTime, "dd/MM/yyyy");

    return formattedDate;
  } catch (error) {
    // Handle any errors appropriately, e.g., log or return a default value
    console.error(error);
    return ""; // Or any other default value
  }
};

export function getLocalTime(date: string) {
  const localTime = utcToZonedTime(
    new Date(date),
    "Asia/Jakarta"
  ).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return localTime; //Output format: 9:30 PM
}

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
