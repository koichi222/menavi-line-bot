import { AttendanceResult, FormattedAttendance } from "./tables";

export function convertDateFormat(dateStr) {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${month}-${day}`;
  } else {
    return 'Invalid date format';
  }
}

export function formatAttendanceResults(results: AttendanceResult[]): FormattedAttendance[] {
  const formatted: FormattedAttendance[] = [];

  results.forEach(result => {
      let attendance = {
          date: result.date,
          startTime: result.startTime,
          endTime: result.endTime
      };

      const existing = formatted.find(f => f.castId === result.castId && f.shopId === result.shopId);
      if (existing) {
          existing.attendances.push(attendance);
      } else {
          formatted.push({
              castId: result.castId,
              name: result.castName,
              shopId: result.shopId,
              attendances: [attendance]
          });
      }
  });

  return formatted;
}