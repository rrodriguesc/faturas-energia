import fs from "fs";
import pdf from "pdf-parse";

import { Fatura } from "./models/Fatura";

const getByLine = (lines: string[], initialText: string) => {
  const lineIdx = lines.findIndex((line) => line.includes(initialText));
  if (lineIdx === -1) {
    throw new Error(`Could not find using identifier: ${initialText}`);
  }
  return lines[lineIdx + 1].trim().split(" ")[0];
};

const getQtdValorByRegex = (text: string, initialText: string) => {
  const re = new RegExp(
    `${initialText}\\s*kWh\\s*(\\d+)\\s*(?:[\\d,]+)\\s*([\\d,]+)`,
    "gm"
  );
  const res = re.exec(text);

  if (res.length < 2) {
    throw new Error(
      `Could not define both Quantity and Value for: ${initialText}`
    );
  }

  return {
    qtd: parseInt(res[1]),
    valor: parseFloat(res[2].replace(",", ".")),
  };
};

const getNClient = (lines: string[]) => getByLine(lines, "Nº DO CLIENTE");

const getMesReferencia = (lines: string[]) => getByLine(lines, "Referente a");

const getEnergiaEletrica = (text: string) => {
  const { qtd, valor } = getQtdValorByRegex(text, "Energia Elétrica");

  return {
    qtdEnergiaEletrica: qtd,
    valorEnergiaEletrica: valor,
  };
};

const getEnergiaSCEEE = (text: string) => {
  const { qtd, valor } = getQtdValorByRegex(text, "Energia SCEE s/ ICMS");

  return {
    qtdEnergiaSCEEE: qtd,
    valorEnergiaSCEEE: valor,
  };
};

const getEnergiaCompensada = (text: string) => {
  const { qtd, valor } = getQtdValorByRegex(text, "Energia compensada GD I");

  return {
    qtdEnergiaCompensada: qtd,
    valorEnergiaCompensada: valor,
  };
};

const getContribuicaoMunicipal = (text: string) => {
  const re = new RegExp("Contrib Ilum Publica Municipal\\s*([\\d,]+)", "gm");
  const res = re.exec(text);
  return parseFloat(res[1].replace(",", "."));
};

const parseFile = async (path: string): Promise<Fatura> => {
  let dataBuffer = fs.readFileSync(path);

  const data = await pdf(dataBuffer);
  const text = data.text;
  const lines = text.split("\n");

  const nCliente = getNClient(lines);
  const mesReferencia = getMesReferencia(lines);
  const { qtdEnergiaEletrica, valorEnergiaEletrica } = getEnergiaEletrica(text);
  const { qtdEnergiaSCEEE, valorEnergiaSCEEE } = getEnergiaSCEEE(text);
  const { qtdEnergiaCompensada, valorEnergiaCompensada } =
    getEnergiaCompensada(text);
  const contribuicaoMunicipal = getContribuicaoMunicipal(text);

  return {
    nCliente,
    mesReferencia,
    qtdEnergiaEletrica,
    valorEnergiaEletrica,
    qtdEnergiaSCEEE,
    valorEnergiaSCEEE,
    qtdEnergiaCompensada,
    valorEnergiaCompensada,
    contribuicaoMunicipal,
  };
};

export default parseFile;
