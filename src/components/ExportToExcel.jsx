import ExcelJS from 'exceljs';
import { clauses, categories } from '../constants/clauses';

export default function ExportToExcel({ pointsHistory, houses }) {
  // Add category colors mapping
  const categoryColors = {
    [categories.MAJOR_EVENTS_SECONDARY]: 'FFB8DAFF', // Light Blue
    [categories.MAJOR_EVENTS_PRIMARY]: 'FFFFD700',   // Gold
    [categories.VACS]: 'FFFF99CC',                   // Pink
    [categories.FLAGS]: 'FF98FB98',                  // Pale Green
    [categories.ACADEMIC]: 'FFE6E6FA',               // Lavender
    [categories.ATTENDANCE]: 'FFFFDAB9',             // Peach
    [categories.MUSIC]: 'FFD8BFD8',                  // Thistle
    [categories.SPORTING]: 'FF87CEEB',               // Sky Blue
    [categories.COLOURS]: 'FFDFB969',                // Golden Rod
    [categories.WAVE]: 'FF98FF98',                   // Mint
    [categories.SPECIAL]: 'FFFFB6C1',                // Light Pink
    [categories.OTHER]: 'FFE0E0E0'                   // Light Gray
  };

  // Get clause category from ID
  const getClauseCategory = (clauseId) => {
    const clause = clauses.find(c => c.id === clauseId);
    return clause?.category || categories.OTHER;
  };

  // Convert house colors from CSS format to Excel ARGB
  const getHouseColor = (color) => {
    const colors = {
      'Blue': 'FF0000FF',
      'White': 'FFFFFFFF',
      'Red': 'FFFF0000',
      'Green': 'FF00FF00'
    };
    return colors[color] || 'FFFFFFFF';
  };

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

    // Add data rows with colors
    pointsHistory.forEach(entry => {
      const row = sheet.addRow({
        date: formatDate(entry.timestamp),
        house: houses[entry.houseIndex].name,
        points: entry.points,
        clause: getClauseName(entry.clauseId),
        students: entry.studentCount,
        awardedBy: entry.awardedBy
      });

      // Color the house cell
      const houseCell = row.getCell(2);
      const house = houses[entry.houseIndex];
      const houseColor = getHouseColor(house.color);
      houseCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: houseColor }
      };

      // Set house cell text color (black for white background, white for others)
      houseCell.font = {
        color: { argb: house.color === 'White' ? 'FF000000' : 'FFFFFFFF' }
      };

      // Color the clause cell based on its category
      const clauseCell = row.getCell(4);
      const category = getClauseCategory(entry.clauseId);
      clauseCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: categoryColors[category] }
      };

      // Center points cell
      const pointsCell = row.getCell(3);
      pointsCell.alignment = { horizontal: 'center' };
    });

    // Add conditional formatting for alternating rows
    sheet.addConditionalFormatting({
      ref: `A2:F${sheet.rowCount}`,
      rules: [
        {
          type: 'expression',
          formulae: ['MOD(ROW(),2)=0'],
          style: {
            fill: {
              type: 'pattern',
              pattern: 'solid',
              bgColor: { argb: 'FFF9F9F9' }
            }
          }
        }
      ]
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
