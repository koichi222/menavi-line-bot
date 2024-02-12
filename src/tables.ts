export type AttendanceResult = {
  // attendances テーブルのカラム
  id: number;
  room: string;
  date: Date;
  weekDay: string;
  startTime: string;
  endTime: string;
  castId: number;
  castName: string;
  castProfile: string;
  bast: number;
  weist: number;
  hip: number;
  twitterId: string;
  shopId: number;
  shopName: string;
  shopArea: string;
  favedAt: Date;
  shopUrl: string;
  reservationUrl: string;
};

export type FormattedAttendance = {
  // attendances テーブルのカラム
  castId: number;
  castName: string;
  castProfile: string;
  bast: number;
  weist: number;
  hip: number;
  shopId: number;
  shopName: string;
  shopArea: string;
  shopUrl: string;
  twitterId: string;
  attendances: {
    id: number;
    date: Date;
    room: string;
    weekDay: string;
    startTime: string;
    endTime: string;
    reservationUrl: string;
  }[];
  favedAt: Date;
};


