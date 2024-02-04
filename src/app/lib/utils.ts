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


export function dateReformat(date: string | Date): string | undefined {
  if (date) {
    return (dayjs(date).format('YYYY/MM/DD'))
  }
}

export const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId as NodeJS.Timeout);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export function updateUrlQueryParam(url: string, key: string, value: string | null): string {
  const urlObject = new URL(url);
  const queryParams = new URLSearchParams(urlObject.search);

  if (value === null || value === "") {
    if (queryParams.has(key)) {
      queryParams.delete(key);
    }
  } else {
    if (queryParams.has(key)) {
      queryParams.set(key, value);
    } else {
      queryParams.append(key, value);
    }
  }

  urlObject.search = queryParams.toString();

  return urlObject.toString();
}




export function getQueryParamValue(url: string, key: string): string | null {
  const urlObject = new URL(url);
  const queryParams = new URLSearchParams(urlObject.search);

  const paramValue = queryParams.get(key);

  return paramValue;
}


export function extractQueryParams(url: string): Record<string, string> | undefined {
  if (url == null || url == undefined) return;
  const urlObject = new URL(url);
  const queryParams = new URLSearchParams(urlObject.search);
  const result: Record<string, string> = {};

  queryParams.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}
