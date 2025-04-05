import { beforeAll, describe, expect, test } from "@jest/globals";
import fs from "fs";
import pdf from "pdf-parse";
import {
  getNClient,
  getMesReferencia,
  getEnergiaEletrica,
  getEnergiaSCEEE,
  getEnergiaCompensada,
  getContribuicaoMunicipal,
} from "../src/parseFile";

describe("Parse file module", () => {
  let globalText: string;
  let globalLines: string[];

  beforeAll(async () => {
    let dataBuffer = fs.readFileSync("./test.pdf");

    const data = await pdf(dataBuffer);
    globalText = data.text;
    globalLines = globalText.split("\n");
  });

  test("nCliente needs to be 7204076116", () => {
    expect(getNClient(globalLines)).toBe("7204076116");
  });

  test("getMesReferencia needs to be 2024/01/01", () => {
    expect(getMesReferencia(globalLines)).toStrictEqual(new Date(2024, 0, 1));
  });

  test("getEnergiaEletrica needs to be {qtdEnergiaEletrica: 50, valorEnergiaEletrica: 47.75,}", () => {
    expect(getEnergiaEletrica(globalText)).toStrictEqual({
      qtdEnergiaEletrica: 50,
      valorEnergiaEletrica: 47.75,
    });
  });

  test("getEnergiaSCEEE needs to be {qtdEnergiaSCEEE: 456, valorEnergiaSCEEE: 232.42}", () => {
    expect(getEnergiaSCEEE(globalText)).toStrictEqual({
      qtdEnergiaSCEEE: 456,
      valorEnergiaSCEEE: 232.42,
    });
  });

  test("getEnergiaCompensada needs to be {qtdEnergiaCompensada: 456, valorEnergiaCompensada: -222.22}", () => {
    expect(getEnergiaCompensada(globalText)).toStrictEqual({
      qtdEnergiaCompensada: 456,
      valorEnergiaCompensada: -222.22,
    });
  });

  test("getContribuicaoMunicipal needs to be 49.43", () => {
    expect(getContribuicaoMunicipal(globalText)).toBe(49.43);
  });
});
