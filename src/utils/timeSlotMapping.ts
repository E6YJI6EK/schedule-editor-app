import { Day } from "@/api/types";

// Маппинг русских названий дней в Day enum
const dayNameToDayEnum: Record<string, Day> = {
  "Понедельник": Day.Mon,
  "Вторник": Day.Tue,
  "Среда": Day.Wed,
  "Четверг": Day.Thu,
  "Пятница": Day.Fri,
  "Суббота": Day.Sat,
  "Воскресенье": Day.Sun,
};

// Маппинг Day enum в числа (1-7)
const dayEnumToNumber: Record<Day, number> = {
  [Day.Mon]: 1,
  [Day.Tue]: 2,
  [Day.Wed]: 3,
  [Day.Thu]: 4,
  [Day.Fri]: 5,
  [Day.Sat]: 6,
  [Day.Sun]: 7,
};

// Маппинг времени в day_partition_id
const timeToDayPartitionId: Record<string, number> = {
  "08:30–10:00": 1,
  "10:10–11:40": 2,
  "12:00–13:30": 3,
  "13:40–15:10": 4,
  "15:20–16:50": 5,
  "17:00–18:30": 6,
};

/**
 * Получить номер дня (1-7) из русского названия
 */
export function getDayNumber(dayName: string): number {
  const dayEnum = dayNameToDayEnum[dayName];
  return dayEnum ? dayEnumToNumber[dayEnum] : 1;
}

/**
 * Получить day_partition_id из времени
 */
export function getDayPartitionId(time: string): number {
  return timeToDayPartitionId[time] || 1;
}

