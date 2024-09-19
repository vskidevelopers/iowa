import React, { useMemo } from "react";
import { useTable } from "react-table";
import "tailwindcss/tailwind.css";

function AttendanceTable({ data }) {
  const columns = useMemo(
    () => [
      {
        Header: "Entry No",
        accessor: "entryNo",
      },
      {
        Header: "Name",
        accessor: "employeeEmail",
      },
      {
        Header: "Month",
        accessor: "month",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Clock In",
        accessor: "timeIn",
      },
      {
        Header: "Clock Out",
        accessor: "timeOut",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  const tableData = useMemo(() => data, [data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: tableData,
    });

  return (
    <table {...getTableProps()} className="table-auto w-full">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="px-2 py-2 font-medium text-left bg-gray-100"
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  className="px-2 py-2 border border-gray-200"
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default AttendanceTable;
