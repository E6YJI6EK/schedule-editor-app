import type { Schedule, RoomColors } from '@/types/schedule';

export const mockSchedule: Schedule = {
  groups: ['МПИ-101', 'МПИ-102', 'МПИ-103'], // Список групп/направлений
  upperWeek: [
    {
      day: 'Понедельник',
      timeslots: [
        { 
          time: '08:30–10:00', 
          groups: [
            { subject: 'Математика', teacher: 'Иванов И.И.', room: '101', building: '1' },
            { subject: 'Физика', teacher: 'Петров П.П.', room: '102', building: '1' },
            { subject: 'История', teacher: 'Смирнов С.С.', room: '201', building: '2' }
          ]
        },
        { 
          time: '10:10–11:40', 
          groups: [
            { subject: 'Физика', teacher: 'Петров П.П.', room: '102', building: '1' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: 'Английский', teacher: 'Козлова М.М.', room: '301', building: '3' }
          ]
        },
        { 
          time: '12:00–13:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: 'Информатика', teacher: 'Сидорова А.А.', room: '201', building: '2' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '13:40–15:10', 
          groups: [
            { subject: 'Информатика', teacher: 'Сидорова А.А.', room: '201', building: '2' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '15:20–16:50', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '17:00–18:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
      ]
    },
    {
      day: 'Вторник',
      timeslots: [
        { 
          time: '08:30–10:00', 
          groups: [
            { subject: 'История', teacher: 'Павлов К.К.', room: '301', building: '3' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: 'Программирование', teacher: 'Иванов И.И.', room: '101', building: '1' }
          ]
        },
        { 
          time: '10:10–11:40', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '12:00–13:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: 'Английский', teacher: 'Козлова М.М.', room: '401', building: '4' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '13:40–15:10', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '15:20–16:50', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '17:00–18:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
      ]
    },
    {
      day: 'Среда',
      timeslots: [
        { 
          time: '08:30–10:00', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '10:10–11:40', 
          groups: [
            { subject: 'Химия', teacher: 'Морозов В.В.', room: '102', building: '1' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: 'Физика', teacher: 'Петров П.П.', room: '102', building: '1' }
          ]
        },
        { 
          time: '12:00–13:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '13:40–15:10', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: 'Экономика', teacher: 'Новикова Л.Л.', room: '201', building: '2' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '15:20–16:50', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '17:00–18:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
      ]
    },
    {
      day: 'Четверг',
      timeslots: [
        { 
          time: '08:30–10:00', 
          groups: [
            { subject: 'Программирование', teacher: 'Иванов И.И.', room: '101', building: '1' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: 'Математика', teacher: 'Иванов И.И.', room: '101', building: '1' }
          ]
        },
        { 
          time: '10:10–11:40', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '12:00–13:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: 'Философия', teacher: 'Соколов Н.Н.', room: '301', building: '3' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '13:40–15:10', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '15:20–16:50', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '17:00–18:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
      ]
    },
    {
      day: 'Пятница',
      timeslots: [
        { 
          time: '08:30–10:00', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '10:10–11:40', 
          groups: [
            { subject: 'Базы данных', teacher: 'Петров П.П.', room: '102', building: '1' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: 'Информатика', teacher: 'Сидорова А.А.', room: '201', building: '2' }
          ]
        },
        { 
          time: '12:00–13:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '13:40–15:10', 
          groups: [
            { subject: 'Физкультура', teacher: 'Титов О.О.', room: 'Спортзал', building: '5' },
            { subject: 'Физкультура', teacher: 'Титов О.О.', room: 'Спортзал', building: '5' },
            { subject: 'Физкультура', teacher: 'Титов О.О.', room: 'Спортзал', building: '5' }
          ]
        },
        { 
          time: '15:20–16:50', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '17:00–18:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
      ]
    },
    {
      day: 'Суббота',
      timeslots: [
        { 
          time: '08:30–10:00', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '10:10–11:40', 
          groups: [
            { subject: 'Математика', teacher: 'Иванов И.И.', room: '101', building: '1' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '12:00–13:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '13:40–15:10', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '15:20–16:50', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '17:00–18:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
      ]
    }
  ],
  lowerWeek: [
    {
      day: 'Понедельник',
      timeslots: [
        { 
          time: '08:30–10:00', 
          groups: [
            { subject: 'История', teacher: 'Павлов К.К.', room: '301', building: '3' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '10:10–11:40', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '12:00–13:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: 'Математика', teacher: 'Иванов И.И.', room: '101', building: '1' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '13:40–15:10', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '15:20–16:50', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '17:00–18:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
      ]
    },
    {
      day: 'Вторник',
      timeslots: [
        { 
          time: '08:30–10:00', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '10:10–11:40', 
          groups: [
            { subject: 'Физика', teacher: 'Петров П.П.', room: '102', building: '1' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '12:00–13:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '13:40–15:10', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: 'Информатика', teacher: 'Сидорова А.А.', room: '201', building: '2' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '15:20–16:50', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '17:00–18:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
      ]
    },
    {
      day: 'Среда',
      timeslots: [
        { 
          time: '08:30–10:00', 
          groups: [
            { subject: 'Английский', teacher: 'Козлова М.М.', room: '401', building: '4' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '10:10–11:40', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '12:00–13:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: 'Химия', teacher: 'Морозов В.В.', room: '102', building: '1' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '13:40–15:10', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '15:20–16:50', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '17:00–18:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
      ]
    },
    {
      day: 'Четверг',
      timeslots: [
        { 
          time: '08:30–10:00', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '10:10–11:40', 
          groups: [
            { subject: 'Программирование', teacher: 'Иванов И.И.', room: '101', building: '1' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '12:00–13:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '13:40–15:10', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: 'Философия', teacher: 'Соколов Н.Н.', room: '301', building: '3' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '15:20–16:50', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '17:00–18:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
      ]
    },
    {
      day: 'Пятница',
      timeslots: [
        { 
          time: '08:30–10:00', 
          groups: [
            { subject: 'Базы данных', teacher: 'Петров П.П.', room: '102', building: '1' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '10:10–11:40', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '12:00–13:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '13:40–15:10', 
          groups: [
            { subject: 'Физкультура', teacher: 'Титов О.О.', room: 'Спортзал', building: '5' },
            { subject: 'Физкультура', teacher: 'Титов О.О.', room: 'Спортзал', building: '5' },
            { subject: 'Физкультура', teacher: 'Титов О.О.', room: 'Спортзал', building: '5' }
          ]
        },
        { 
          time: '15:20–16:50', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '17:00–18:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
      ]
    },
    {
      day: 'Суббота',
      timeslots: [
        { 
          time: '08:30–10:00', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '10:10–11:40', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '12:00–13:30', 
          groups: [
            { subject: 'Физика', teacher: 'Петров П.П.', room: '102', building: '1' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '13:40–15:10', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '15:20–16:50', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
        { 
          time: '17:00–18:30', 
          groups: [
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' },
            { subject: '', teacher: '', room: '', building: '' }
          ]
        },
      ]
    }
  ]
};

export const roomColors: RoomColors = {
  '101': '#b3e5fc',
  '102': '#c8e6c9',
  '201': '#fff9c4',
  '301': '#ffe0b2',
  '401': '#f8bbd0',
  'Спортзал': '#e1bee7'
};

