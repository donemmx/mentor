import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";

export default function Table({users}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
   
    setProducts(users);
  }, []);

  return (
    <div className="card">
      <DataTable
        value={products}
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[ 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="name" sortable header="Name"></Column>
        <Column field="email" sortable header="Email"></Column>
        <Column field="category" sortable header="Category"></Column>
        
          <button></button>
          <button>Suspend</button>
      </DataTable>
    </div>
  );
}
