import { useState } from 'react';
import ExcelJS from 'exceljs';
import { updatePoints } from '../services/points';
import { categories } from '../constants/clauses';

export default function ImportFromExcel({ houses, setPoints }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      setError('');

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(await file.arrayBuffer());
      
      // Get the Summary sheet
      const summarySheet = workbook.getWorksheet('Summary');
      if (!summarySheet) {
        throw new Error('Summary sheet not found in the Excel file');
      }

      const newPoints = new Array(4).fill(0);
      
      // Process Summary sheet
      summarySheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) { // Skip header row
          const houseName = row.getCell(1).value;
          const points = parseInt(row.getCell(2).value) || 0;
          
          const houseIndex = houses.findIndex(h => h.name === houseName);
          if (houseIndex !== -1) {
            newPoints[houseIndex] = points;
          }
        }
      });

      // Validate other sheets exist
      const sheetNames = workbook.worksheets.map(sheet => sheet.name);
      const missingCategories = Object.values(categories).filter(
        category => !sheetNames.includes(category)
      );

      if (missingCategories.length > 0) {
        console.warn('Missing category sheets:', missingCategories);
      }

      // Update all points in Firebase
      for (let i = 0; i < houses.length; i++) {
        Upload Excel
        <input
          type="file"
          accept=".xlsx"
          onChange={handleImport}
          disabled={loading}
          style={{ display: 'none' }}
        />
      </label>
      {loading && <span>Loading...</span>}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
