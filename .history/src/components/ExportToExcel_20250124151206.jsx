import ExcelJS from 'exceljs';
import { clauses } from '../constants/clauses';

export default function ExportToExcel({ points, houses, pointHistory = [] }) {
  // Helper function to get clause name from ID
  const getClauseName = (clauseId) => {
    const clause = clauses.find(c => c.id === clauseId);
    return clause ? `${clause.id} - ${clause.name}` : clauseId;
  };

  // Helper function to format date
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('House Points History');

    // Set up columns with specific widths
    sheet.columns = [
      { header: 'Date', key: 'date', width: 20 },
      { header: 'House', key: 'house', width: 15 },
      { header: 'Points', key: 'points', width: 10 },
      { header: 'Clause', key: 'clause', width: 50 },
      { header: 'Students', key: 'students', width: 10 },
      { header: 'Awarded By', key: 'awardedBy', width: 25 }
    ];

    // Add data rows
    pointHistory.forEach(entry => {
      const row = sheet.addRow({
        date: formatDate(entry.timestamp),
        house: houses[entry.houseIndex].name,
        points: entry.points,
        clause: getClauseName(entry.clauseId),
        students: entry.studentCount,
        awardedBy: entry.awardedBy
      });

      // Apply house-specific color to the house cell
      const houseCell = row.getCell(2); // House column
      const house = houses[entry.houseIndex];
      houseCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: house.color.replace('#', '') }
      };
      // Add white or black text based on background color brightness
      const colorValue = parseInt(house.color.replace('#', ''), 16);
      const brightness = (
        ((colorValue >> 16) & 255) * 0.299 +
        ((colorValue >> 8) & 255) * 0.587 +
        (colorValue & 255) * 0.114
      ) / 255;
      houseCell.font = {
        color: { argb: brightness > 0.5 ? '000000' : 'FFFFFF' }
      };

      // Style the points cell
      const pointsCell = row.getCell(3);
      pointsCell.alignment = { horizontal: 'center' };
    });

    // Style the header row
    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, size: 12 };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }
    };
    headerRow.alignment = { horizontal: 'center' };

    // Add borders to all cells
    sheet.eachRow((row, rowNumber) => {
      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });

    // Freeze the header row
    sheet.views = [
      { state: 'frozen', ySplit: 1 }
    ];

    // Auto-filter for all columns
    sheet.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: 6 }
    };

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

  return (
    <button onClick={handleExport} className="export-btn">
      Download Excel
    </button>
  );
}
