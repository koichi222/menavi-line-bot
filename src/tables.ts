export type AttendanceResult = {
  // attendances テーブルのカラム
  id: number;
  shopId: number;
  castId: number;
  room: string;
  date: Date;
  weekDay: string;
  startTime: string;
  endTime: string;
  url: string;
  reservationUrl: string;
  // shops テーブルのカラム
  Area: string;
  shopUrl: string;
  // casts テーブルのカラム
  name: string;
  profile: string;
  bast: number;
  weist: number;
  hip: number;
  twitterId: string;
  // favorites テーブルのカラム
  favedAt: Date;
};

export type FormattedAttendance = {
  // attendances テーブルのカラム
  id: number;
  shopId: number;
  area: string;
  shopUrl: string;
  castId: number;
  name: string;
  room: string;
  url: string;
  reservationUrl: string;
  profile: string;
  bast: number;
  weist: number;
  hip: number;
  twitterId: string;
  attendances: {
    date: Date;
    weekDay: string;
    startTime: string;
    endTime: string;
  }[];
  favedAt: Date;
};


