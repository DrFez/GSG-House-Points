import { useState } from 'react';
import ExcelJS from 'exceljs';
import { updatePoints } from '../services/points';
import { categories } from '../constants/clauses';

export default function ImportFromExcel({ houses, setPoints }) {
  const [loading, setLoading] = useState(false);

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      setError('');

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(await file.arrayBuffer());
      
      const worksheet = workbook.getWorksheet(1);
      const newPoints = new Array(4).fill(0);
      
      // Skip header row and process data
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) { // Skip header row
          const houseName = row.getCell(1).value;
          const points = parseInt(row.getCell(2).value) || 0;
          
          const houseIndex = houses.findIndex(h => h.name === houseName);
          if (houseIndex !== -1) {
            newPoints[houseIndex] = points;
          }
        }
      });

      // Update all points in Firebase
      for (let i = 0; i < houses.length; i++) {
        await updatePoints(i, newPoints[i]);
      }
      
      setPoints(newPoints);
    } catch (err) {
      setError('Failed to import data. Please check the file format.');
      console.error(err);
    } finally {
      setLoading(false);
      e.target.value = ''; // Reset input
    }
  };

  return (
    <div className="import-container">
      <label className="import-btn">
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
