import ExcelJS from 'exceljs';

export default function ExportToExcel({ points, houses }) {
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('House Points');

    // Add headers
    worksheet.columns = [
      { header: 'House', key: 'house' },
      { header: 'Points', key: 'points' },
      { header: 'Color', key: 'color' },
      { header: 'Emblem', key: 'emblem' }
    ];

    // Add data
    houses.forEach((house, index) => {
      worksheet.addRow({
        house: house.name,
        points: points[index],
        color: house.color,
        emblem: house.emblem
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
