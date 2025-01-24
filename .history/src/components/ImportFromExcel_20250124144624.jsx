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