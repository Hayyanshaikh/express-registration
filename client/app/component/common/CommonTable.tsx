"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CommonTableProps } from "@/app/types";
import CommonSearch from "./CommonSearch";

const CommonTable: React.FC<CommonTableProps> = ({
  columns,
  data,
  emptyMessage = "No data available.",
  placeholder = "Search",
  searchColumns = [],
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    if (data) setFilteredData(data || []);
  }, [data]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((row) => {
        return searchColumns.some((column) => {
          const searchValue = row[column];
          return (
            searchValue &&
            searchValue.toString().toLowerCase().includes(query.toLowerCase())
          );
        });
      });
      setFilteredData(filtered);
    }
  };

  return (
    <>
      <CommonSearch
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="border rounded-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col, i) => (
                <TableHead
                  key={i}
                  className="p-2 px-4 bg-gray-50"
                  style={col.width ? { width: col.width } : {}}
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData?.length > 0 ? (
              filteredData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className="p-2 px-4"
                      style={col.width ? { width: col.width } : {}}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-10"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default CommonTable;
