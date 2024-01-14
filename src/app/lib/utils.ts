import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from 'dayjs'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatnumber(num: number): string | undefined {
  if (typeof (Number(num)) !== 'number') {
    return undefined
  }
  return new Intl.NumberFormat('en-US').format(num)
}


export function formatcurrency(amount: number): string | undefined {
  if (!amount) return;

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: 'GHS',
    notation: 'standard'
  }).format(amount);

  return formattedAmount;
}


export function dateReformat(date: string): string | undefined {
  if (date) {
    return (dayjs(date).format('DD/MM/YYYY'))
  }
}

export const debounce = <T extends (...args: any[] ) => void>(func: T, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId as NodeJS.Timeout);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};


