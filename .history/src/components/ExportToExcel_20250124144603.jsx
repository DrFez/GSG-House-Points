import { utils, writeFile } from 'xlsx';

export default function ExportToExcel({ points, houses }) {
  const handleExport = () => {
    const data = houses.map((house, index) => ({
      House: house.name,
      Points: points[index],
      Color: house.color,
      Emblem: house.emblem
    }));

    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "House Points");
    
    // Generate timestamp for filename
    const timestamp = new Date().toISOString().split('T')[0];
    writeFile(wb, `house-points-${timestamp}.xlsx`);
  };

  return (
    <button onClick={handleExport} className="export-btn">
      Download Excel
    </button>
  );
}
