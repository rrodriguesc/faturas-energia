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
}

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
