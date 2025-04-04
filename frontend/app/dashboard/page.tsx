"use client";

import {
  DashboardFilter,
  DashboardTotal,
  FilterParams,
} from "@/components/dashboard";
import ResultadosEnergiaChart from "@/components/ResultadosEnergiaChart";
import ResultadosFinanceirosChart from "@/components/ResultadosFinanceirosChart";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Fatura, getFaturasByClient } from "@/services/faturas";
import { useEffect, useMemo, useState } from "react";

const Dashboard = () => {
  const [filterParams, setFilterParams] = useState<FilterParams>();
  const [faturasData, setFaturasData] = useState<Fatura[]>();

  useEffect(() => {
    if (filterParams?.nCliente) {
      getFaturasByClient(
        filterParams?.nCliente,
        filterParams?.startDate,
        filterParams?.endDate
      )
        .then((data) => setFaturasData(data))
        .catch((err) =>
          console.error(
            "Could not get faturas for client: ",
            filterParams.nCliente,
            err
          )
        );
    }
  }, [filterParams]);

  const resultadosEnergiaData = useMemo(
    () =>
      faturasData?.map((fatura) => ({
        consumo: fatura.qtdEnergiaEletrica,
        compensada: fatura.qtdEnergiaCompensada,
      })),
    [faturasData]
  );

  const resultadosFinanceirosData = useMemo(
    () =>
      faturasData?.map((fatura) => ({
        total: fatura.valorTotalSemGD,
        economia: fatura.economiaGD,
      })),
    [faturasData]
  );

  const energiaConsumida = useMemo(
    () =>
      faturasData
        ?.map((fatura) => fatura.consumoEnergiaEletrica)
        .reduce((acc, c) => acc + c, 0),
    [faturasData]
  );

  const valorCompensado = useMemo(
    () =>
      faturasData
        ?.map((fatura) => fatura.energiaCompensada)
        .reduce((acc, c) => acc + c, 0),
    [faturasData]
  );

  const valorTotalSemGd = useMemo(
    () =>
      faturasData
        ?.map((fatura) => fatura.valorTotalSemGD)
        .reduce((acc, c) => acc + c, 0),
    [faturasData]
  );

  const economiaGd = useMemo(
    () =>
      faturasData
        ?.map((fatura) => fatura.economiaGD)
        .reduce((acc, c) => acc + c, 0),
    [faturasData]
  );

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 text-xl">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          Dashboard
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Separator className="my-2" />
        <DashboardFilter onSubmit={(values) => setFilterParams(values)} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {energiaConsumida && (
            <DashboardTotal
              key="econsumida"
              title="Total de energia consumida (KWh)"
              content={energiaConsumida}
            />
          )}
          {valorCompensado && (
            <DashboardTotal
              key="vcompensado"
              title="Valor compensado (KWh)"
              content={valorCompensado}
            />
          )}
          {valorTotalSemGd && (
            <DashboardTotal
              key="vtotalgd"
              title="Valor Total sem GD (R$)"
              content={valorTotalSemGd.toFixed(2)}
            />
          )}
          {economiaGd && (
            <DashboardTotal
              key="economiagd"
              title="Economia GD (R$)"
              content={economiaGd.toFixed(2)}
            />
          )}
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-2 xl:grid-cols-3">
          {resultadosEnergiaData && (
            <ResultadosEnergiaChart
              key="resultados-energia"
              chartData={resultadosEnergiaData}
            />
          )}
          {resultadosFinanceirosData && (
            <ResultadosFinanceirosChart
              key="resultados-financeiros"
              chartData={resultadosFinanceirosData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
