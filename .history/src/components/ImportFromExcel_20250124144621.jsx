import { useState } from 'react';
import { read, utils } from 'xlsx';
import { updatePoints } from '../services/points';

export default function ImportFromExcel({ houses, setPoints }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');