"use client";

import { FileText } from "lucide-react";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import classNames from "classnames";

export type Fatura = {
  id: string;
  nCliente: string;
  jan?: string;
  feb?: string;
  mar?: string;
  apr?: string;
  may?: string;
  jun?: string;
  jul?: string;
  aug?: string;
  sep?: string;
  oct?: string;
  nov?: string;
  dec?: string;
};

const buildCell = ({ cell }: CellContext<Fatura, string | undefined>) => {
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

export const columns: ColumnDef<Fatura, string | undefined>[] = [
  {
    accessorKey: "nCliente",
    header: "Número do Cliente",
  },
  { accessorKey: "jan", header: "JAN", cell: buildCell },
  { accessorKey: "feb", header: "FEV", cell: buildCell },
  { accessorKey: "mar", header: "MAR", cell: buildCell },
  { accessorKey: "apr", header: "ABR", cell: buildCell },
  { accessorKey: "may", header: "MAI", cell: buildCell },
  { accessorKey: "jun", header: "JUN", cell: buildCell },
  { accessorKey: "jul", header: "JUL", cell: buildCell },
  { accessorKey: "aug", header: "AGO", cell: buildCell },
  { accessorKey: "sep", header: "SET", cell: buildCell },
  { accessorKey: "oct", header: "OUT", cell: buildCell },
  { accessorKey: "nov", header: "NOV", cell: buildCell },
  { accessorKey: "dec", header: "DEZ", cell: buildCell },
];
