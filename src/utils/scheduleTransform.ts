import type { LessonWithRelations } from "@/api/lessons";
import type { DaySchedule, ClassData } from "@/types/schedule";
import { Day } from "@/api/types";

// Маппинг дней из бэкенда в русские названия
const dayMap: Record<Day, string> = {
  [Day.Mon]: "Понедельник",
  [Day.Tue]: "Вторник",
  [Day.Wed]: "Среда",
  [Day.Thu]: "Четверг",
  [Day.Fri]: "Пятница",
  [Day.Sat]: "Суббота",
  [Day.Sun]: "Воскресенье",
};

const DEFAULT_TIMES = [
  "08:30–10:00",
  "10:10–11:40",
  "12:00–13:30",
  "13:40–15:10",
  "15:20–16:50",
  "17:00–18:30",
];

/**
 * Преобразует данные уроков из бэкенда в формат расписания для одной недели
 */
export function transformLessonsToWeekSchedule(
  lessons: LessonWithRelations[],
  groupIds: number[]
): DaySchedule[] {
  // Маппинг дней для индексации (1=пн, 2=вт, 3=ср, 4=чт, 5=пт, 6=сб)
  const dayKeys: Day[] = [Day.Mon, Day.Tue, Day.Wed, Day.Thu, Day.Fri, Day.Sat];
  const dayNumbers = [1, 2, 3, 4, 5, 6];
  
  // Группируем уроки по дню и dayPartitionId
  const lessonsByDayAndPartition = new Map<string, LessonWithRelations[]>();
  
  lessons.forEach((lesson) => {
    const day = lesson.time_slot.day; // число 1-6
    const dayPartitionId = lesson.time_slot.day_partition?.id;
    
    if (!dayPartitionId) return;
    
    const key = `${day}-${dayPartitionId}`;
    if (!lessonsByDayAndPartition.has(key)) {
      lessonsByDayAndPartition.set(key, []);
    }
    lessonsByDayAndPartition.get(key)!.push(lesson);
  });

  console.log("lessonsByDayAndPartition", lessonsByDayAndPartition);

  // Создаем расписание для каждого дня
  const weekSchedule: DaySchedule[] = dayKeys.map((dayKey, index) => {
    const dayNumber = dayNumbers[index];
    const daySchedule: DaySchedule = {
      day: dayMap[dayKey],
      timeslots: [],
    };

    // Для каждого временного слота (1-6)
    for (let dayPartitionId = 1; dayPartitionId <= 6; dayPartitionId++) {
      const time = DEFAULT_TIMES[dayPartitionId - 1] || "";
      const key = `${dayNumber}-${dayPartitionId}`;
      const lessonsForSlot = lessonsByDayAndPartition.get(key) || [];
      
      // Создаем массив данных для каждой группы
      const classDataArray: ClassData[] = groupIds.map((groupId) => {
        const lesson = lessonsForSlot.find((l) => l.group?.id === groupId);
        
        if (lesson) {
          return {
            lessonId: lesson.id,
            subject: lesson.discipline ? {
              id: lesson.discipline.id,
              name: lesson.discipline.name
            } : null,
            teacher: lesson.teacher ? {
              id: lesson.teacher.id,
              name: lesson.teacher.name,
              discipline_id: 0 // Это поле отсутствует в LessonWithRelations
            } : null,
            room: lesson.class_room ? {
              id: lesson.class_room.id,
              number: lesson.class_room.number,
              building_id: lesson.class_room.building?.id || 0
            } : null,
            building: lesson.class_room?.building ? {
              id: lesson.class_room.building.id,
              name: lesson.class_room.building.short_name
            } : null,
            groupId: groupId,
            timeSlotId: lesson.time_slot.id,
          };
        } else {
          // Пустая ячейка для группы без урока
          return {
            subject: null,
            teacher: null,
            room: null,
            building: null,
            groupId: groupId,
            timeSlotId: undefined,
          };
        }
      });

      daySchedule.timeslots.push({
        time,
        groups: classDataArray,
      });
    }

    return daySchedule;
  });

  console.log("weekSchedule", weekSchedule);

  return weekSchedule;
}

/**
 * Получает список групп из уроков
 */
export function getGroupsFromLessons(
  lessons: LessonWithRelations[],
  groupIds: number[]
): string[] {
  const groupsMap = new Map<number, string>();
  lessons.forEach((lesson) => {
    if (lesson.group && !groupsMap.has(lesson.group.id)) {
      groupsMap.set(lesson.group.id, lesson.group.name);
    }
  });

  return groupIds
    .map((id) => groupsMap.get(id))
    .filter((name): name is string => !!name);
}
