import { useContext, useEffect, useRef } from "react";
import { Card, CardBody } from "react-bootstrap";
import { TableContext } from "../../../App";
import { Tags } from "../../../interface";
// import jszip from "jszip";
// import pdfmake from "pdfmake";
import DataTable, { DataTableSlot, DataTableRef } from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-autofill-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-buttons/js/buttons.print.mjs";
import "datatables.net-responsive-bs5";
import "datatables.net-rowgroup-bs5";
import "datatables.net-searchpanes-bs5";
import "datatables.net-select-bs5";

DataTable.use(DT);

function TableData() {
  const table = useContext(TableContext);
  const tableRef = useRef<DataTableRef>(null);

  const columns = [
    { data: "code" },
    { data: "date" },
    { data: "flow" },
    { data: "mode" },
    { data: "tags" },
    { data: "amount" },
    { data: "description" },
  ];
  useEffect(() => {
    table?.setData(tableRef.current?.dt());

    if (localStorage.getItem("save")) return;
  }, []);

  useEffect(() => {
    if (localStorage.getItem("save")) {
      table?.data?.rows
        .add(JSON.parse(localStorage.getItem("save") as string))
        .draw();
    }
  }, [table?.data]);

  return (
    <>
      <Card className="shadow">
        <CardBody>
          <DataTable
            className="display table"
            options={{
              responsive: true,
              select: true,
              buttons: ["csv"],
            }}
            ref={tableRef}
            columns={columns}
            slots={{
              1: DT.render.datetime() as DataTableSlot,
              4: (data: Tags[] | null) => {
                if (!data?.length)
                  return (
                    <p className="px-1 rounded bg-warning tag-table p-2">
                      No Tags
                    </p>
                  );

                return (
                  <>
                    {data.map((el, index) => (
                      <div
                        key={index}
                        className="p-2 tag-item bg-primary mb-2 rounded  text-light"
                      >
                        <h5 className="d-inline">{el.category}: </h5>
                        <p className="d-inline">{el.selected || "None"}</p>
                      </div>
                    ))}
                  </>
                );
              },
            }}
          >
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Date</th>
                <th scope="col">Flow</th>
                <th scope="col">Mode</th>
                <th scope="col">Tags</th>
                <th scope="col">Amount</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
          </DataTable>
        </CardBody>
      </Card>
    </>
  );
}

export default TableData;
