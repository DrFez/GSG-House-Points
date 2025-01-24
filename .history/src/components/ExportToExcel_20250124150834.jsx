import ExcelJS from 'exceljs';

export default function ExportToExcel({ points, houses, pointHistory = [] }) {
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('House Points History');

    // Set up columns
    sheet.columns = [
      { header: 'Date', key: 'date', width: 12 },
      { header: 'House', key: 'house', width: 15 },
      { header: 'Points', key: 'points', width: 10 },
      { header: 'Clause', key: 'clause', width: 30 },
      { header: 'Students', key: 'students', width: 10 },
      { header: 'Awarded By', key: 'awardedBy', width: 25 }
    ];

    // Add data rows
    pointHistory.forEach(entry => {
      sheet.addRow({
        date: new Date(entry.timestamp).toLocaleDateString(),
        house: houses[entry.houseIndex].name,
        points: entry.points,
        clause: entry.clauseId,
        students: entry.studentCount,
        awardedBy: entry.awardedBy
      });
    });

    // Style the header row
    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }
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
