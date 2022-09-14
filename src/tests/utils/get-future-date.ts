import { parseISO, setYear } from 'date-fns';

/**
 * Returns a date one year ahead
 *
 * @param date string in format "yyyy-mm-dd"
 */
export function getFutureDate(date: string): Date {
  return setYear(parseISO(date), new Date().getFullYear() + 1);
}
