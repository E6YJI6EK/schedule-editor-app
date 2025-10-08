import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function exportToExcel(scheduleData, weekType) {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  
  // Process each week
  ['upperWeek', 'lowerWeek'].forEach(week => {
    const weekData = scheduleData[week];
    const weekName = week === 'upperWeek' ? 'Верхняя неделя' : 'Нижняя неделя';
    
    // Prepare data for Excel
    const excelData = [];
    
    // Add header row
    const headerRow = ['Время', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    excelData.push(headerRow);
    
    // Get all unique time slots
    const allTimes = [];
    weekData.forEach(day => {
      day.timeslots.forEach(slot => {
        if (!allTimes.includes(slot.time)) {
          allTimes.push(slot.time);
        }
      });
    });
    
    // Sort times
    allTimes.sort();
    
    // Create rows for each time slot
    allTimes.forEach(time => {
      const row = [time];
      
      // Add data for each day
      ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'].forEach(dayName => {
        const dayData = weekData.find(d => d.day === dayName);
        const timeSlot = dayData?.timeslots.find(t => t.time === time);
        
        if (timeSlot && timeSlot.subject) {
          const cellData = `${timeSlot.subject}\n${timeSlot.teacher}\n${timeSlot.group}\n${timeSlot.room} (${timeSlot.building})`;
          row.push(cellData);
        } else {
          row.push('');
        }
      });
      
      excelData.push(row);
    });
    
    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    
    // Set column widths
    const columnWidths = [
      { wch: 15 }, // Time column
      { wch: 25 }, // Monday
      { wch: 25 }, // Tuesday
      { wch: 25 }, // Wednesday
      { wch: 25 }, // Thursday
      { wch: 25 }, // Friday
      { wch: 25 }  // Saturday
    ];
    worksheet['!cols'] = columnWidths;
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, weekName);
  });
  
  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  // Save file
  const fileName = `Расписание_${new Date().toLocaleDateString('ru-RU').replace(/\./g, '_')}.xlsx`;
  saveAs(data, fileName);
}
