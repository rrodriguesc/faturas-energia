import { Fatura } from "./Fatura";

export interface UserConsumption extends Fatura {
  consumoEnergiaEletrica: number;
  energiaCompensada: number;
  valorTotalSemGD: number;
  economiaGD: number;
}
