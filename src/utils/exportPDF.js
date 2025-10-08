import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function exportToPDF(scheduleData, weekType) {
  const doc = new jsPDF('landscape', 'mm', 'a4');
  
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
      
      tableData.push(row);
    });
    
    // Create table
    doc.autoTable({
      head: [['Время', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']],
      body: tableData,
      startY: 30,
      styles: {
        fontSize: 8,
        cellPadding: 3,
        overflow: 'linebreak',
        halign: 'center',
        valign: 'middle'
      },
      headStyles: {
        fillColor: [66, 139, 202],
        textColor: 255,
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { halign: 'center', cellWidth: 20 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
        4: { cellWidth: 30 },
        5: { cellWidth: 30 },
        6: { cellWidth: 30 }
      },
      margin: { left: 20, right: 20 }
    });
  });
  
  // Save PDF
  const fileName = `Расписание_${new Date().toLocaleDateString('ru-RU').replace(/\./g, '_')}.pdf`;
  doc.save(fileName);
}
