import { defineStore } from "pinia";
import { mockSchedule } from "@/utils/mockData";
import type {
  Schedule,
  WeekType,
  WeekTypeShort,
  ClassData,
} from "@/types/schedule";
import {
  getSchedule,
  createLesson,
  updateLesson,
  getTimeSlotId,
} from "@/api/lessons";
import {
  transformLessonsToWeekSchedule,
  getGroupsFromLessons,
} from "@/utils/scheduleTransform";
import { createEmptySchedule } from "@/utils/createEmptySchedule";
import type { Group } from "@/api/types";
import { getDayNumber, getDayPartitionId } from "@/utils/timeSlotMapping";

interface ScheduleState {
  schedule: Schedule;
  currentWeek: WeekTypeShort;
  loading: boolean;
  error: string | null;
}

export const useScheduleStore = defineStore("schedule", {
  state: (): ScheduleState => ({
    schedule: mockSchedule,
    currentWeek: "upper" as WeekTypeShort,
    loading: false,
    error: null,
  }),
  actions: {
    switchWeek(): void {
      this.currentWeek = this.currentWeek === "upper" ? "lower" : "upper";
    },
    async updateCell(
      week: WeekType,
      day: string,
      time: string,
      groupIndex: number,
      newData: Partial<ClassData>
    ): Promise<void> {
      const targetWeek = this.schedule[week];
      const dayData = targetWeek.find((d) => d.day === day);
      const timeSlot = dayData?.timeslots.find((t) => t.time === time);

      if (!timeSlot || !timeSlot.groups || !timeSlot.groups[groupIndex]) {
        throw new Error("Не удалось найти ячейку расписания");
      }

      const currentCell = timeSlot.groups[groupIndex];
      const isUpperWeek = week === "upperWeek";

      // Проверяем, есть ли все необходимые данные для сохранения
      if (
        !newData.subject ||
        !newData.teacher ||
        !newData.room ||
        !newData.groupId
      ) {
        // Если данные неполные, просто обновляем локально (возможно, пользователь очистил ячейку)
        Object.assign(currentCell, newData);
        return;
      }

      try {
        // Если у урока уже есть ID, обновляем его
        if (currentCell.lessonId) {
          const payload = {
            discipline_id: newData.subject.id,
            teacher_id: newData.teacher.id,
            class_room_id: newData.room.id,
          };

          await updateLesson(currentCell.lessonId, payload);

          // Обновляем локальные данные после успешного обновления
          Object.assign(currentCell, newData);
        } else {
          // Создаем новый урок
          // Сначала получаем time_slot_id
          const dayNumber = getDayNumber(day);
          const dayPartitionId = getDayPartitionId(time);
          const weekType = isUpperWeek ? "upper" : "lower";

          const timeSlotResponse = await getTimeSlotId({
            week_type: weekType,
            day: dayNumber,
            day_partition_id: dayPartitionId,
          });

          const timeSlotId = timeSlotResponse.data.id;

          const payload = {
            discipline_id: newData.subject.id,
            teacher_id: newData.teacher.id,
            class_room_id: newData.room.id,
            group_id: newData.groupId,
            time_slot_id: timeSlotId,
          };

          const response = await createLesson(payload);

          // Обновляем локальные данные с новым lesson_id
          Object.assign(currentCell, {
            ...newData,
            lessonId: response.data.id,
            timeSlotId: timeSlotId,
          });
        }
      } catch (error: any) {
        console.error("Ошибка при сохранении урока:", error);
        throw new Error(
          error?.response?.data?.message || "Не удалось сохранить изменения"
        );
      }
    },
    addNewClass(
      week: WeekType,
      day: string,
      time: string,
      groupIndex: number,
      classData: ClassData
    ): void {
      const targetWeek = this.schedule[week];
      const dayData = targetWeek.find((d) => d.day === day);
      const timeSlot = dayData?.timeslots.find((t) => t.time === time);
      if (timeSlot && timeSlot.groups && timeSlot.groups[groupIndex]) {
        Object.assign(timeSlot.groups[groupIndex], classData);
      }
    },
    async moveCell(
      fromWeek: WeekType,
      fromDay: string,
      fromTime: string,
      fromGroupIndex: number,
      toWeek: WeekType,
      toDay: string,
      toTime: string,
      toGroupIndex: number
    ): Promise<void> {
      // Get source cell data
      const fromWeekData = this.schedule[fromWeek];
      const fromDayData = fromWeekData.find((d) => d.day === fromDay);
      const fromTimeSlot = fromDayData?.timeslots.find(
        (t) => t.time === fromTime
      );
      const fromCell = fromTimeSlot?.groups?.[fromGroupIndex];

      if (!fromCell) return;

      // Get target cell data
      const toWeekData = this.schedule[toWeek];
      const toDayData = toWeekData.find((d) => d.day === toDay);
      const toTimeSlot = toDayData?.timeslots.find((t) => t.time === toTime);
      const toCell = toTimeSlot?.groups?.[toGroupIndex];

      if (!toCell) return;

      // Сохраняем оригинальные данные для возможного отката (rollback)
      const originalFromCell = { ...fromCell };
      const originalToCell = { ...toCell };

      // ОПТИМИСТИЧНОЕ ОБНОВЛЕНИЕ: сначала обновляем UI
      const temp = { ...fromCell };
      Object.assign(fromCell, toCell);
      Object.assign(toCell, temp);

      // Теперь отправляем запросы на бэкенд
      try {
        const fromIsUpperWeek = fromWeek === "upperWeek";
        const toIsUpperWeek = toWeek === "upperWeek";

        // Получаем time_slot_id для новых позиций
        const fromDayNumber = getDayNumber(fromDay);
        const fromDayPartitionId = getDayPartitionId(fromTime);
        const fromWeekType = toIsUpperWeek ? "upper" : "lower";

        const toDayNumber = getDayNumber(toDay);
        const toDayPartitionId = getDayPartitionId(toTime);
        const toWeekType = fromIsUpperWeek ? "upper" : "lower";

        const updates: Promise<any>[] = [];
        console.log(
          toDayNumber,
          toDayPartitionId,
          fromDayNumber,
          fromDayPartitionId
        );
        const newToTimeSlotResponse = await getTimeSlotId({
          week_type: toWeekType,
          day: toDayNumber,
          day_partition_id: toDayPartitionId,
        });
        const newFromTimeSlotResponse = await getTimeSlotId({
          week_type: fromWeekType,
          day: fromDayNumber,
          day_partition_id: fromDayPartitionId,
        });

        // Обновляем урок, который был перемещен ИЗ fromCell В toCell
        // (теперь он находится в toCell с данными originalFromCell)
        if (originalFromCell.lessonId && originalFromCell.subject) {
          updates.push(
            updateLesson(originalFromCell.lessonId, {
              time_slot_id: newToTimeSlotResponse.data.id,
            }).then(() => {
              // Обновляем timeSlotId в локальных данных
              toCell.timeSlotId = newToTimeSlotResponse.data.id;
            })
          );
        }

        // Обновляем урок, который был перемещен ИЗ toCell В fromCell
        // (теперь он находится в fromCell с данными originalToCell)
        if (originalToCell.lessonId && originalToCell.subject) {
          updates.push(
            updateLesson(originalToCell.lessonId, {
              time_slot_id: newFromTimeSlotResponse.data.id,
            }).then(() => {
              // Обновляем timeSlotId в локальных данных
              fromCell.timeSlotId = newFromTimeSlotResponse.data.id;
            })
          );
        }

        // Ждем завершения всех обновлений
        await Promise.all(updates);
      } catch (error: any) {
        console.error("Ошибка при перемещении урока:", error);

        // ROLLBACK: откатываем изменения в UI
        Object.assign(fromCell, originalFromCell);
        Object.assign(toCell, originalToCell);

        // Показываем ошибку пользователю
        this.error =
          error?.response?.data?.message || "Не удалось переместить урок";

        throw error;
      }
    },
    getCurrentWeekData() {
      const weekType: WeekType =
        this.currentWeek === "upper" ? "upperWeek" : "lowerWeek";
      return this.schedule[weekType];
    },
    getWeekData(weekType: WeekType) {
      return this.schedule[weekType];
    },
    async loadSchedule(
      groupIds: number[],
      isUpperWeek: boolean,
      groups: Group[]
    ) {
      this.loading = true;
      this.error = null;
      try {
        const response = await getSchedule({
          group_ids: groupIds,
          is_upper_week: isUpperWeek,
        });

        if (response.success && response.data) {
          // Преобразуем данные из бэкенда в формат фронтенда для одной недели
          const weekSchedule = transformLessonsToWeekSchedule(
            response.data,
            groupIds
          );

          // Обновляем расписание для соответствующей недели
          if (isUpperWeek) {
            this.schedule.upperWeek = weekSchedule;
          } else {
            this.schedule.lowerWeek = weekSchedule;
          }

          // Обновляем список групп
          const groupNames = getGroupsFromLessons(response.data, groupIds);
          if (groupNames.length > 0) {
            this.schedule.groups = groupNames;
          }
        }
      } catch (error: any) {
        // Если ошибка 404 (расписание не найдено), создаем пустое расписание
        if (error?.status === 404 || error?.response?.status === 404) {
          // Создаем пустое расписание для этой недели
          const emptySchedule = createEmptySchedule(groups);
          if (isUpperWeek) {
            this.schedule.upperWeek = emptySchedule.upperWeek;
          } else {
            this.schedule.lowerWeek = emptySchedule.lowerWeek;
          }
          this.schedule.groups = emptySchedule.groups;
          this.error = null; // Не показываем ошибку, если это просто пустое расписание
        } else {
          this.error = error?.message || "Ошибка при загрузке расписания";
          console.error("Error loading schedule:", error);
        }
      } finally {
        this.loading = false;
      }
    },
    async loadBothWeeks(groupIds: number[], groups: Group[]) {
      // Если групп нет, создаем пустое расписание
      if (groups.length === 0) {
        return;
      }

      // Сначала создаем пустую структуру расписания
      const emptySchedule = createEmptySchedule(groups);
      this.schedule.groups = emptySchedule.groups;
      this.schedule.upperWeek = emptySchedule.upperWeek;
      this.schedule.lowerWeek = emptySchedule.lowerWeek;

      // Затем загружаем данные с бэкенда (если есть)
      await Promise.all([
        this.loadSchedule(groupIds, true, groups),
        this.loadSchedule(groupIds, false, groups),
      ]);
    },
  },
});
