export function daysBetweenDates(dateStr1: string, dateStr2: string): number {
  // Parse the date strings into Date objects
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);

  // Calculate the difference in time (in milliseconds)
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());

  // Convert time difference from milliseconds to days
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return daysDiff;
}

export function calculateDiscount({
  checkIn,
  checkOut,
  price,
}: {
  checkIn: string;
  checkOut: string;
  price: number;
}) {
  // need to create a map offering discounts on various dates.

  // for now we will just return the standard 10% discount
  return price * 0.1;
}
