import { useState, useEffect } from "react";
import "./App.css";
import Assets from "./Components/Assets";
import Header from "./Components/Header";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { localhost } from "./Production";

function App() {
  const searched = (filterType, filterValue) => {
    console.log(filterType, filterValue);
    fetchAssets(filterType, filterValue);
  };

  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const download = () => {
    exportToExcel();
  };

  const exportToExcel = () => {
    const data = {
      name: assets.name,
      cdsid: assets.cdsid,
      location: assets.location,
      asset_category: assets.asset_category,
      asset_id: assets.asset_id,
      project: assets.project,
    };

    const worksheet = XLSX.utils.json_to_sheet(assets);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, "data.xlsx");
  };

  const fetchAssets = async (filterType, filterValue) => {
    if (filterValue !== "" && filterType !== "NONE") {
      try {
        console.log(`${localhost}/assets/find-by-category/${filterType}/${filterValue}`);
        const response = await fetch(
          `${localhost}/assets/find-by-category/${filterType}/${filterValue}`
        );
        const data = await response.json();
        setAssets(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await fetch(`${localhost}/assets/findall`);
        const data = await response.json();
        console.log(data);
        setAssets(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  console.log(assets);
  return (
    <div className="app">
      <Header searched={searched} />
      <Assets download={download} data={assets} />
    </div>
  );
}

export default App;
