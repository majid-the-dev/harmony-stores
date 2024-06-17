import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const authFormSchema = (type) =>
  z.object({
    // Only sign-up
    firstName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    lastName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    phone: type === "sign-in" ? z.string().optional() : z.string().min(8),
    // Both sign-in and sign-up
    email: z.string().email(),
    password: z.string().min(8),
  });

export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (dateString) => {
  if (!dateString) return ""; // Return an empty string if dateString is undefined
  const date = new Date(dateString);
  const options = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
