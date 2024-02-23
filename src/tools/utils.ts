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
  const formattedResults: FormattedAttendance[] = [];

  results.forEach(result => {
    // 既存のキャスト情報を検索
    let castEntry = formattedResults.find(entry => entry.castId === result.cast_id);
    // キャスト情報が既に存在する場合は、出席情報のみ追加
    if (castEntry) {
      castEntry.attendances.push({
        id: result.id,
        room: result.room,
        weekDay: result.week_day,
        startTime: result.start_time,
        endTime: result.end_time,
        reservationUrl: result.reservation_url,
      });
    } else {
      // 新しいキャスト情報を作成し、初めての出席情報を追加
      formattedResults.push({
        castId: result.cast_id,
        castName: result.cast_name,
        castProfile: result.cast_profile,
        bust: result.bast, // オリジナルの質問では `bast` とされていましたが、おそらく `bust` の誤りです
        waist: result.weist, // オリジナルでは `weist` とされていましたが、`waist` の誤りかもしれません
        hip: result.hip,
        twitterId: result.twitter_id,
        favoriteId: result.favorite_id,
        favedAt: result.faved_at,
        shopId: result.shop_id,
        shopName: result.shop_name,
        shopArea: result.shop_area,
        shopUrl: result.shop_url,
        attendances: [{
          id: result.id,
          room: result.room,
          weekDay: result.week_day,
          startTime: result.start_time,
          endTime: result.end_time,
          reservationUrl: result.reservation_url,
        }],
      });
    }
  });

  return formattedResults;
}