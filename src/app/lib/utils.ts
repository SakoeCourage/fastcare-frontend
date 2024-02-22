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

export function isNullOrWhitespace(input: string | null | undefined): boolean {
  return input === null || input === undefined || /^\s*$/.test(input);
}



export function getQueryParamValue(url: string, key: string): string | null {
  if (url == null || url == undefined || key == null || key == undefined) return;

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


export function getInitials(name:string) {
  const parts = name.split(' ');
  
  if (parts.length === 1) {
      return parts[0][0];
  }
  
  return parts[0][0] + parts[1][0];
}

export function converBase64StringToFile(bs64string: string, filename:string): File {
  let file: File | null = null;
  if (typeof bs64string === "string") {
      const inputString = bs64string as string;
      const base64Data = inputString.split(",")[1];
      const startMarker = 'data:';
      const endMarker = ';base64';
      const startIndex = inputString.indexOf(startMarker) + startMarker.length; 
      const endIndex = inputString.indexOf(endMarker); 
      const extension = inputString.substring(startIndex, endIndex);
      const base64Buffer = Buffer.from(base64Data, 'base64');
      const blob = new Blob([base64Buffer]);
      file = new File([blob], filename, { type: extension });
  }
  return file
}