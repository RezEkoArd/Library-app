import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


// Fungsi untuk generate array tahun
export const generateYearOptions = (startYear?: number, endYear?: number) => {
    const currentYear = new Date().getFullYear();
    const start = startYear || (currentYear - 10); // Default 10 tahun ke belakang
    const end = endYear || (currentYear + 5);      // Default 5 tahun ke depan
    
    return Array.from({ length: end - start + 1 }, (_, i) => {
      const year = start + i;
      return {
        value: year.toString(),
        label: year.toString(),
      };
    }).reverse();
}