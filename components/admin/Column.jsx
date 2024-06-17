"use client"

import { ColumnDef } from "@tanstack/react-table";

export const columns = [
    {
      id: "id",
      Header: "ID",
      accessor: "_id",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Parent",
      accessor: "parent",
      Cell: ({ value }) => { // Custom cell for parent category
        if (!value) return "No Parent"; // Handle case where no parent exists
        return value.name || value._id; // Access parent name or fallback to parent ID
      },
    },
    // Add more columns as needed
  ];