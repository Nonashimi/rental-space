import { Dates } from "@/store/search-datas";

export function useFormatDates({ checkIn, checkOut }: Dates): string {
  if (!checkIn || !checkOut) {
    return '';
  }
  const sameMonth = checkIn.getMonth() === checkOut.getMonth();
  const sameYear = checkIn.getFullYear() === checkOut.getFullYear();

  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };

  const checkInStr = checkIn.toLocaleDateString('en-US', options);

  let checkOutStr = '';

  if (sameMonth) {
    // Только число для checkout, например "7"
    checkOutStr = checkOut.getDate().toString();
  } else {
    // Если месяц разный, выводим "Sep 5 – Oct 7"
    checkOutStr = checkOut.toLocaleDateString('en-US', options);
  }

  const year = checkOut.getFullYear();

  return `${checkInStr} – ${checkOutStr}, ${year}`;
}