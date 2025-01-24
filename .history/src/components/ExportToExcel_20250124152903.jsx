import ExcelJS from 'exceljs';

export default function ExportToExcel({ pointsHistory, houses }) {
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('House Points History');

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
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleExport} className="export-btn">
      Download Excel
    </button>
  );
}
