"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Fatura, getFaturas } from "@/services/faturas";
import { useEffect, useMemo, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Faturas = () => {
  const [data, setData] = useState<Fatura[]>();
  const [selectedYear, setSelectedYear] = useState<number>();

  useEffect(() => {
    getFaturas().then((faturas) => {
      setData(faturas);
    });
  }, []);

  const years = useMemo(() => {
    const allYears = data?.map((fatura) => fatura.year);
    if (!allYears) {
      return undefined;
    }
    return [...new Set(allYears)].toSorted((a, b) => a - b);
  }, [data]);

  useEffect(() => years && setSelectedYear(years[0]), [years]);

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 text-xl">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          Faturas
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Separator className="my-2" />
        {data && selectedYear && (
          <div className="flex flex-1 flex-col gap-4">
            <ToggleGroup
              className="w-full"
              type="single"
              value={`${selectedYear}`}
              onValueChange={(value) => setSelectedYear(parseInt(value))}
            >
              {years?.map((year) => (
                <ToggleGroupItem key={year} value={`${year}`}>
                  {year}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <DataTable
              columns={columns}
              data={data.filter((fatura) => fatura.year === selectedYear)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Faturas;
