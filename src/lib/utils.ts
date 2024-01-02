import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateYearStrings = (): string[] => {
  const currentYear = new Date().getFullYear();
  const startYear = 2020;
  const years: string[] = [];

  for (let year = currentYear; year >= startYear; year--) {
    years.push(year.toString());
  }

  return years;
};
