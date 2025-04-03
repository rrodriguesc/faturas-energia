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
  return [
    {
      id: 2,
      nCliente: "7204076116",
      mesReferencia: "2024-02-01T03:00:00.000Z",
      qtdEnergiaEletrica: 50,
      valorEnergiaEletrica: 48.06,
      qtdEnergiaSCEEE: 250,
      valorEnergiaSCEEE: 128.21,
      qtdEnergiaCompensada: 250,
      valorEnergiaCompensada: 0,
      contribuicaoMunicipal: 41.19,
      consumoEnergiaEletrica: 300,
      energiaCompensada: 250,
      valorTotalSemGD: 217.46,
      economiaGD: 0,
    },
    {
      id: 4,
      nCliente: "7204076116",
      mesReferencia: "2024-01-01T03:00:00.000Z",
      qtdEnergiaEletrica: 50,
      valorEnergiaEletrica: 47.75,
      qtdEnergiaSCEEE: 456,
      valorEnergiaSCEEE: 232.42,
      qtdEnergiaCompensada: 456,
      valorEnergiaCompensada: 0,
      contribuicaoMunicipal: 49.43,
      consumoEnergiaEletrica: 506,
      energiaCompensada: 456,
      valorTotalSemGD: 329.59999999999997,
      economiaGD: 0,
    },
    {
      id: 1,
      nCliente: "7204076116",
      mesReferencia: "2024-04-01T03:00:00.000Z",
      qtdEnergiaEletrica: 50,
      valorEnergiaEletrica: 47.75,
      qtdEnergiaSCEEE: 476,
      valorEnergiaSCEEE: 242.63,
      qtdEnergiaCompensada: 476,
      valorEnergiaCompensada: 0,
      contribuicaoMunicipal: 49.43,
      consumoEnergiaEletrica: 526,
      energiaCompensada: 476,
      valorTotalSemGD: 339.81,
      economiaGD: 0,
    },
    {
      id: 3,
      nCliente: "7204076116",
      mesReferencia: "2024-05-01T03:00:00.000Z",
      qtdEnergiaEletrica: 50,
      valorEnergiaEletrica: 47.92,
      qtdEnergiaSCEEE: 449,
      valorEnergiaSCEEE: 229.66,
      qtdEnergiaCompensada: 449,
      valorEnergiaCompensada: 0,
      contribuicaoMunicipal: 49.43,
      consumoEnergiaEletrica: 499,
      energiaCompensada: 449,
      valorTotalSemGD: 327.01,
      economiaGD: 0,
    },
    {
      id: 6,
      nCliente: "7204076116",
      mesReferencia: "2024-06-01T03:00:00.000Z",
      qtdEnergiaEletrica: 50,
      valorEnergiaEletrica: 49.37,
      qtdEnergiaSCEEE: 461,
      valorEnergiaSCEEE: 245.33,
      qtdEnergiaCompensada: 461,
      valorEnergiaCompensada: 3,
      contribuicaoMunicipal: 52.77,
      consumoEnergiaEletrica: 511,
      energiaCompensada: 461,
      valorTotalSemGD: 347.46999999999997,
      economiaGD: 3,
    },
    {
      id: 10,
      nCliente: "7204076116",
      mesReferencia: "2024-03-01T03:00:00.000Z",
      qtdEnergiaEletrica: 50,
      valorEnergiaEletrica: 47.92,
      qtdEnergiaSCEEE: 504,
      valorEnergiaSCEEE: 257.74,
      qtdEnergiaCompensada: 504,
      valorEnergiaCompensada: 0,
      contribuicaoMunicipal: 49.43,
      consumoEnergiaEletrica: 554,
      energiaCompensada: 504,
      valorTotalSemGD: 355.09000000000003,
      economiaGD: 0,
    },
  ].map((fatura) => ({
    ...fatura,
    mesReferencia: new Date(fatura.mesReferencia),
  }));
};
