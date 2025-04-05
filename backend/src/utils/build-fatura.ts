import { CreateFaturaDto } from '../faturas/dto/create-fatura.dto';
import { Fatura } from '../faturas/entities/fatura.entity';

export const buildFatura = (params: CreateFaturaDto) => {
  const fatura = new Fatura();
  fatura.url = params.url;
  fatura.nCliente = params.nCliente;
  fatura.mesReferencia = params.mesReferencia;
  fatura.qtdEnergiaEletrica = params.qtdEnergiaEletrica;
  fatura.valorEnergiaEletrica = params.valorEnergiaEletrica;
  fatura.qtdEnergiaSCEEE = params.qtdEnergiaSCEEE;
  fatura.valorEnergiaSCEEE = params.valorEnergiaSCEEE;
  fatura.qtdEnergiaCompensada = params.qtdEnergiaCompensada;
  fatura.valorEnergiaCompensada = params.valorEnergiaCompensada;
  fatura.contribuicaoMunicipal = params.contribuicaoMunicipal;
  fatura.consumoEnergiaEletrica =
    params.qtdEnergiaEletrica + params.qtdEnergiaSCEEE;
  fatura.energiaCompensada = params.qtdEnergiaCompensada;
  fatura.valorTotalSemGD =
    params.valorEnergiaEletrica +
    params.valorEnergiaSCEEE +
    params.contribuicaoMunicipal;
  fatura.economiaGD = params.valorEnergiaCompensada;
  return fatura;
};
