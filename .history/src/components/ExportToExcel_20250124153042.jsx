import ExcelJS from 'exceljs';

export default function ExportToExcel({ pointsHistory = [], houses }) {
  const handleExport = async () => {
    if (!Array.isArray(pointsHistory) || pointsHistory.length === 0) {
      alert('No history data available to export');
      return;
    // Add headers
    worksheet.columns = [
      { header: 'Date', key: 'date' },
      { header: 'House', key: 'house' },
      { header: 'Points', key: 'points' },
      { header: 'Total Points', key: 'totalPoints' },
      { header: 'Reason', key: 'reason' }
    ];

    // Sort data chronologically
    const sortedHistory = [...pointsHistory].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );

    // Add data
    sortedHistory.forEach(entry => {
      const house = houses.find(h => h.id === entry.houseId);
      worksheet.addRow({
        date: new Date(entry.date).toLocaleDateString(),
        house: house.name,
        points: entry.points,
        totalPoints: entry.totalPoints,
        reason: entry.reason || ''
      });
    });

    // Generate timestamp for filename
    const timestamp = new Date().toISOString().split('T')[0];
    const buffer = await workbook.xlsx.writeBuffer();
    
    // Create download
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `house-points-history-${timestamp}.xlsx`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleExport} className="export-btn">
      Export History to Excel
    </button>
  );
}
