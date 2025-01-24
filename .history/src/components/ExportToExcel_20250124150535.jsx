import ExcelJS from 'exceljs';
import { categories } from '../constants/clauses';

export default function ExportToExcel({ points, houses, pointHistory = [] }) {
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();

    // Add Summary sheet
    const summarySheet = workbook.addWorksheet('Summary');
    summarySheet.columns = [
      { header: 'House', key: 'house' },
      { header: 'Total Points', key: 'points' },
      { header: 'Color', key: 'color' },
      { header: 'Emblem', key: 'emblem' }
    ];

    houses.forEach((house, index) => {
      summarySheet.addRow({
        house: house.name,
        points: points[index],
        color: house.color,
        emblem: house.emblem
      });
    });

    // Add category-specific sheets
    Object.values(categories).forEach(category => {
      const sheet = workbook.addWorksheet(category);
      sheet.columns = [
        { header: 'Date', key: 'date' },
        { header: 'House', key: 'house' },
        { header: 'Points', key: 'points' },
        { header: 'Reason', key: 'reason' },
        { header: 'Students', key: 'students' },
        { header: 'Awarded By', key: 'awardedBy' }
      ];

      // Filter point history for this category
      const categoryHistory = (pointHistory || []).filter(entry => 
        entry?.clauseId?.startsWith(getCategoryPrefix(category))
      );

      // Add data to category sheet
      categoryHistory.forEach(entry => {
        sheet.addRow({
          date: new Date(entry.timestamp).toLocaleDateString(),
          house: houses[entry.houseIndex].name,
          points: entry.points,
          reason: entry.reason,
          students: entry.studentCount,
          awardedBy: entry.awardedBy
        });
      });
    });

    // Generate timestamp for filename
    const timestamp = new Date().toISOString().split('T')[0];
    const buffer = await workbook.xlsx.writeBuffer();
    
    // Create download
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `house-points-${timestamp}.xlsx`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  // Helper function to get category prefix from clause ID
  const getCategoryPrefix = (category) => {
    switch(category) {
      case categories.MAJOR_EVENTS_SECONDARY:
      case categories.MAJOR_EVENTS_PRIMARY:
        return "5.1";
      case categories.VACS: return "5.2";
      case categories.FLAGS: return "5.3";
      case categories.ACADEMIC: return "5.4";
      case categories.ATTENDANCE: return "5.5";
      case categories.MUSIC: return "5.6";
      case categories.SPORTING: return "5.7";
      case categories.COLOURS: return "5.8";
      case categories.WAVE: return "5.9";
      case categories.SPECIAL: return "5.10";
      case categories.OTHER: return "5.11";
      default: return "";
    }
  };

  return (
    <button onClick={handleExport} className="export-btn">
      Download Excel
    </button>
  );
}
