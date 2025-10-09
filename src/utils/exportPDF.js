import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function exportToPDF(scheduleData, weekType) {
  const doc = new jsPDF('landscape', 'mm', 'a4');
  
  const groups = scheduleData.groups || ['Группа 1', 'Группа 2', 'Группа 3'];
  
  // Process each week
  ['upperWeek', 'lowerWeek'].forEach((week, weekIndex) => {
    if (weekIndex > 0) {
      doc.addPage();
    }
    
    const weekData = scheduleData[week];
    const weekName = week === 'upperWeek' ? 'Верхняя неделя' : 'Нижняя неделя';
    
    // Add title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(weekName, 20, 20);
    
    // Prepare data for PDF table
    const tableData = [];
    
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
      
      // Add data for each day and group
      ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'].forEach(dayName => {
        const dayData = weekData.find(d => d.day === dayName);
        const timeSlot = dayData?.timeslots.find(t => t.time === time);
        
        groups.forEach((_, groupIdx) => {
          const groupData = timeSlot?.groups?.[groupIdx];
          if (groupData && groupData.subject) {
            const cellData = `${groupData.subject}\n${groupData.teacher}\n${groupData.room} (${groupData.building})`;
            row.push(cellData);
          } else {
            row.push('');
          }
        });
      });
      
      tableData.push(row);
    });
    
    // Create header with two rows
    const headerRow1 = [
      { content: 'Время', rowSpan: 2 }
    ];
    ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'].forEach(day => {
      headerRow1.push({ content: day, colSpan: groups.length });
    });
    
    const headerRow2 = [];
    ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'].forEach(() => {
      groups.forEach(group => {
        headerRow2.push(group);
      });
    });
    
    // Calculate column widths
    const timeColWidth = 15;
    const groupColWidth = (297 - 40 - timeColWidth) / (6 * groups.length); // A4 landscape width minus margins
    
    const columnStyles = { 0: { halign: 'center', cellWidth: timeColWidth } };
    for (let i = 1; i <= 6 * groups.length; i++) {
      columnStyles[i] = { cellWidth: groupColWidth };
    }
    
    // Create table
    doc.autoTable({
      head: [headerRow1, headerRow2],
      body: tableData,
      startY: 30,
      styles: {
        fontSize: 6,
        cellPadding: 2,
        overflow: 'linebreak',
        halign: 'center',
        valign: 'middle'
      },
      headStyles: {
        fillColor: [66, 139, 202],
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 7
      },
      columnStyles: columnStyles,
      margin: { left: 10, right: 10 }
    });
  });
  
  // Save PDF
  const fileName = `Расписание_${new Date().toLocaleDateString('ru-RU').replace(/\./g, '_')}.pdf`;
  doc.save(fileName);
}
