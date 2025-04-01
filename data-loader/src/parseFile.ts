import fs from "fs";
import pdf from "pdf-parse";

import { Fatura } from "./models/Fatura";

const getNClient = (lines: string[]) => {
  const lineIdx = lines.findIndex((line) => line.includes("Nº DO CLIENTE"));
  if (lineIdx === -1) {
    throw new Error("Could not find the client number identifier");
  }
  return lines[lineIdx + 1].trim().split(" ")[0];
};

const getMesReferencia = (lines: string[]) => {
  const lineIdx = lines.findIndex((line) => line.includes("Referente a"));
  if (lineIdx === -1) {
    throw new Error("Could not find the month reference identifier");
  }
  return lines[lineIdx + 1].trim().split(" ")[0];
};

const getEnergiaEletrica = (text: string) => {
  const re = new RegExp(
    "Energia Elétrica\\s*kWh\\s*(\\d+)\\s*(?:[\\d,]+)\\s*([\\d,]+)",
    "gm"
  );
  const res = re.exec(text);

  return {
    qtdEnergiaEletrica: res[1],
    valorEnergiaEletrica: res[2],
  };
};

const getEnergiaSCEEE = (text: string) => {
  const re = new RegExp(
    "Energia SCEE s/ ICMS\\s*kWh\\s*(\\d+)\\s*(?:[\\d,]+)\\s*([\\d,]+)",
    "gm"
  );
  const res = re.exec(text);

  return {
    qtdEnergiaSCEEE: res[1],
    valorEnergiaSCEEE: res[2],
  };
};

const getEnergiaCompensada = (text: string) => {
  const re = new RegExp(
    "Energia compensada GD I\\s*kWh\\s*(\\d+)\\s*(?:[\\d,]+)\\s*([\\d,]+)",
    "gm"
  );
  const res = re.exec(text);

  return {
    qtdEnergiaCompensada: res[1],
    valorEnergiaCompensada: res[2],
  };
};

const getContribuicaoMunicipal = (text: string) => {
  const re = new RegExp("Contrib Ilum Publica Municipal\\s*([\\d,]+)", "gm");
  const res = re.exec(text);
  return res[1];
};

const parseFile = async (path: string): Fatura => {
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

parseFile("./Faturas/Instalação_ 3001116735/3001116735-01-2024.pdf");

export default parseFile;
