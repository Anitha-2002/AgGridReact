import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "../styles/grid.css";
import { useState, useMemo, useEffect } from "react";
import axios from "axios";

const Grid = () => {
  const [classname, setClassname] = useState("ag-theme-quartz");
  const [rows, setRowData] = useState([
    { make: "Tesla", model: "Model 1", price: 6400 },
    { make: "Ford", model: "Model 2", price: 2400 },
  ]);
  function addRowData() {
    const newRow = {
      make: "bmw",
      model: "Model 3",
      price: 7400,
    };
    setRowData([...rows, newRow]);
  }
  function deleteRowData() {
    setRowData(rows.slice(0, -1));
  }
  function changeTheme() {
    classname === "ag-theme-quartz"
      ? setClassname("ag-theme-quartz-dark")
      : setClassname("ag-theme-quartz");
  }
  useEffect(() => {
    axios
      .get("https://www.ag-grid.com/example-assets/row-data.json")
      .then((response) => {
        setRowData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  const [cols, setCols] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ]);

  return (
    <div className="grid">
      <div className={classname} style={{ height: 300, width: 600 }}>
        <button
          id="dark-mode-btn"
          onClick={changeTheme}
          style={{ backgroundColor: white }}
        >
          Enable Dark Mode
        </button>
        <br></br>
        <AgGridReact
          rowData={rows.map((row, index) => ({
            ...row,
            id: index,
          }))}
          columnDefs={cols}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
        />
        <br></br>
        <div className="crud">
          <button onClick={addRowData}>Add a row</button>
          <button onClick={deleteRowData}>Delete a row</button>
        </div>
      </div>
    </div>
  );
};

export default Grid;
