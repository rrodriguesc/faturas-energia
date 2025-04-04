"use client";

import { FileText } from "lucide-react";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import classNames from "classnames";
import { FaturaTable } from "@/services/faturas";

const buildCell = ({ cell }: CellContext<FaturaTable, string | undefined>) => {
  const url = cell.getValue();
  return (
    <a
      className={classNames({ "text-gray-300": !url })}
      href={url}
      target="_blank"
    >
      <FileText />
    </a>
  );
};

export const columns: ColumnDef<FaturaTable, string | undefined>[] = [
  {
    accessorKey: "nCliente",
    header: "Número do Cliente",
  },
  { accessorKey: "1", header: "JAN", cell: buildCell },
  { accessorKey: "2", header: "FEV", cell: buildCell },
  { accessorKey: "3", header: "MAR", cell: buildCell },
  { accessorKey: "4", header: "ABR", cell: buildCell },
  { accessorKey: "5", header: "MAI", cell: buildCell },
  { accessorKey: "6", header: "JUN", cell: buildCell },
  { accessorKey: "7", header: "JUL", cell: buildCell },
  { accessorKey: "8", header: "AGO", cell: buildCell },
  { accessorKey: "9", header: "SET", cell: buildCell },
  { accessorKey: "10", header: "OUT", cell: buildCell },
  { accessorKey: "11", header: "NOV", cell: buildCell },
  { accessorKey: "12", header: "DEZ", cell: buildCell },
];
