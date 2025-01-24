import { useState } from 'react';
import { read, utils } from 'xlsx';
import { updatePoints } from '../services/points';

export default function ImportFromExcel({ houses, setPoints }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      setError('');

      const data = await file.arrayBuffer();
      const wb = read(data);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const jsonData = utils.sheet_to_json(ws);

      const newPoints = new Array(4).fill(0);
      
      jsonData.forEach(row => {
        const houseIndex = houses.findIndex(h => h.name === row.House);
        if (houseIndex !== -1) {
          newPoints[houseIndex] = parseInt(row.Points) || 0;
        }
      });

      // Update all points in Firebase
      for (let i = 0; i < houses.length; i++) {
        await updatePoints(i, newPoints[i]);
      }
      
      setPoints(newPoints);
    } catch (err) {
      setError('Failed to import data. Please check the file format.');