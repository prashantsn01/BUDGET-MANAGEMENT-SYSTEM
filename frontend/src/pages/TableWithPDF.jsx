import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Correct import

const TableWithPDF = () => {
  const data = [
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Smith", age: 30 },
    { id: 3, name: "Alice Johnson", age: 28 },
  ];

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("User Data", 14, 10);

    const tableColumn = ["ID", "Name", "Age"];
    const tableRows = data.map((item) => [item.id, item.name, item.age]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("table.pdf");
  };

  return (
    <div>
      <h2>User Table</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={downloadPDF} style={{ marginTop: "10px" }}>
        Download PDF
      </button>
    </div>
  );
};

export default TableWithPDF;
