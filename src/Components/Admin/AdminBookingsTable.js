import React, { useMemo } from "react";
import { useTable } from "react-table";
import "tailwindcss/tailwind.css";

function AdminBookingsTable({ data }) {
  const columns = useMemo(
    () => [
      {
        Header: "Entry No.",
        accessor: "entryNo",
      },
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
      },
      {
        Header: "Room Type",
        accessor: "roomType",
      },
      {
        Header: "Check In",
        accessor: "checkIn",
      },
      {
        Header: "Check Out",
        accessor: "checkOut",
      },
      {
        Header: "Adults",
        accessor: "adults",
      },
      {
        Header: "Children",
        accessor: "children",
      },
      {
        Header: "Special Requirements",
        accessor: "specialRequirements",
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
    <table {...getTableProps()} className="table-auto">
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

export default AdminBookingsTable;
