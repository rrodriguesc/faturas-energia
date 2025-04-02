import { FaturaDoc } from "./FaturaDoc";

export interface Fatura extends FaturaDoc {
  consumoEnergiaEletrica: number;
  energiaCompensada: number;
  valorTotalSemGD: number;
  economiaGD: number;
}
