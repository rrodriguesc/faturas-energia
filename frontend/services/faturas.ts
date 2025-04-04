import { API_DATA_URL } from "./constants";
import { format } from "date-fns";

export interface Fatura {
  id: number;
  nCliente: string;
  mesReferencia: Date;
  qtdEnergiaEletrica: number;
  valorEnergiaEletrica: number;
  qtdEnergiaSCEEE: number;
  valorEnergiaSCEEE: number;
  qtdEnergiaCompensada: number;
  valorEnergiaCompensada: number;
  contribuicaoMunicipal: number;
  consumoEnergiaEletrica: number;
  energiaCompensada: number;
  valorTotalSemGD: number;
  economiaGD: number;
  url?: string;
}

export type FaturaTable = {
  id: string;
  nCliente: string;
  year: number;
  1?: string;
  2?: string;
  3?: string;
  4?: string;
  5?: string;
  6?: string;
  7?: string;
  8?: string;
  9?: string;
  10?: string;
  11?: string;
  12?: string;
};

export const getFaturasTable = async (): Promise<FaturaTable[]> =>
  fetch(`${API_DATA_URL}/faturas`)
    .then((res) => res.json())
    .then((data: Fatura[]) => {
      const faturas = data.map((fatura) => ({
        nCliente: fatura.nCliente,
        year: new Date(fatura.mesReferencia).getFullYear(),
        [new Date(fatura.mesReferencia).getMonth() + 1]: fatura.url,
      }));
      const mapFaturas: Record<string, FaturaTable> = {};
      faturas.forEach((fatura) => {
        const key = `${fatura.nCliente}:${fatura.year}`;
        mapFaturas[key] = { ...mapFaturas[key], ...fatura };
      });
      return Object.values(mapFaturas);
    });

export const getFaturasByClient = async (
  nClient: string,
  startDate?: Date,
  endDate?: Date
): Promise<Fatura[]> => {
  const params = new URLSearchParams({
    startDate: startDate ? format(startDate, "yyyy-MM-dd") : "",
    endDate: endDate ? format(endDate, "yyyy-MM-dd") : "",
  }).toString();
  return fetch(`${API_DATA_URL}/faturas/cliente/${nClient}?${params}`)
    .then((res) => res.json())
    .then((data: Fatura[]) =>
      data.map((fatura) => ({
        ...fatura,
        mesReferencia: new Date(fatura.mesReferencia),
      }))
    );
};
