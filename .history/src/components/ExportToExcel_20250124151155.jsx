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
