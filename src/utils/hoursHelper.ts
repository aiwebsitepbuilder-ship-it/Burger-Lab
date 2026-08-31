/**
 * Helper to compute real-time restaurant status based on Bangladesh Time (UTC+6)
 */
export interface CurrentStatus {
  isOpen: boolean;
  statusText: string;
  subText: string;
  dhakaTimeStr: string;
  dayName: string;
}

export function getDhakaRestaurantStatus(): CurrentStatus {
  // Compute current time in Dhaka (Asia/Dhaka is UTC+6)
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const dhakaOffset = 6 * 3600000; // UTC+6
  const dhakaDate = new Date(utc + dhakaOffset);

  const dayOfWeek = dhakaDate.getDay(); // 0 = Sunday, 1 = Monday, ... 5 = Friday, 6 = Saturday
  const hours = dhakaDate.getHours();
  const minutes = dhakaDate.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  // Opening time: 11:30 AM (11*60 + 30 = 690)
  // Closing time: 11:00 PM (23*60 = 1380)
  const openTimeMinutes = 11 * 60 + 30; // 690
  const closeTimeMinutes = 23 * 60;      // 1380

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[dayOfWeek];

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Dhaka'
  });
  const dhakaTimeStr = timeFormatter.format(now);

  const isOpen = totalMinutes >= openTimeMinutes && totalMinutes < closeTimeMinutes;

  if (isOpen) {
    const minutesLeft = closeTimeMinutes - totalMinutes;
    const hoursLeft = Math.floor(minutesLeft / 60);
    const minsRemainder = minutesLeft % 60;
    const timeRemainingStr = hoursLeft > 0 ? `${hoursLeft}h ${minsRemainder}m` : `${minsRemainder}m`;

    return {
      isOpen: true,
      statusText: 'Open Now for Dining & Takeaway',
      subText: `Service open until 11:00 PM (${timeRemainingStr} remaining today in Dhaka)`,
      dhakaTimeStr,
      dayName
    };
  } else {
    // If before opening (00:00 to 11:29)
    if (totalMinutes < openTimeMinutes) {
      const minutesUntilOpen = openTimeMinutes - totalMinutes;
      const hoursUntil = Math.floor(minutesUntilOpen / 60);
      const minsUntil = minutesUntilOpen % 60;
      const untilStr = hoursUntil > 0 ? `${hoursUntil}h ${minsUntil}m` : `${minsUntil}m`;

      return {
        isOpen: false,
        statusText: 'Currently Closed',
        subText: `Opens today at 11:30 AM (in ~${untilStr})`,
        dhakaTimeStr,
        dayName
      };
    } else {
      return {
        isOpen: false,
        statusText: 'Closed for the Night',
        subText: 'Opens tomorrow at 11:30 AM across all 4 Dhaka branches',
        dhakaTimeStr,
        dayName
      };
    }
  }
}
