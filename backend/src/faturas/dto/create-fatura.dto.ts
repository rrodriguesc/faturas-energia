export class CreateFaturaDto {
  nCliente: string;
  mesReferencia: Date;
  qtdEnergiaEletrica: number;
  valorEnergiaEletrica: number;
  qtdEnergiaSCEEE: number;
  valorEnergiaSCEEE: number;
  qtdEnergiaCompensada: number;
  valorEnergiaCompensada: number;
  contribuicaoMunicipal: number;
  url: string;
}
