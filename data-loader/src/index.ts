#! /usr/bin/env node

import { Command } from "commander";
import fs from "fs";
import parseFile from "./parseFile";
import { AppDataSource } from "./data-source";
import { UserConsumption } from "./entity/userConsumption";

interface Options {
  directory?: string;
  file?: string;
  save: boolean;
}

const getFiles = (options: Options) => {
  if (!options.file && !options.directory) {
    throw new Error("You must define a file or a directory");
  }

  const files: string[] = [];

  if (options.file) {
    files.push(options.file!);
  } else {
    fs.readdirSync(options.directory, {
      recursive: true,
      withFileTypes: true,
    }).forEach((file) => {
      if (file.isFile() && file.name.endsWith(".pdf")) {
        files.push(`${file.parentPath}/${file.name}`);
      }
    });
  }
  return files;
};

const program = new Command();

program
  .version("1.0.0")
  .description("Faturas em PDF parser")
  .option("-d, --directory  [value]", "Directory to parse")
  .option("-f, --file [value]", "Single file to parse")
  .option("-s, --save", "Save to database", true)
  .parse(process.argv);

const options = program.opts<Options>();

const files = getFiles(options);

Promise.all(files.map((f) => parseFile(f))).then((faturas) => {
  const consumptions = faturas.map((fatura) => {
    const consumption = new UserConsumption();
    consumption.nCliente = fatura.nCliente;
    consumption.mesReferencia = fatura.mesReferencia;
    consumption.qtdEnergiaEletrica = fatura.qtdEnergiaEletrica;
    consumption.valorEnergiaEletrica = fatura.valorEnergiaEletrica;
    consumption.qtdEnergiaSCEEE = fatura.qtdEnergiaSCEEE;
    consumption.valorEnergiaSCEEE = fatura.valorEnergiaSCEEE;
    consumption.qtdEnergiaCompensada = fatura.qtdEnergiaCompensada;
    consumption.valorEnergiaCompensada = fatura.valorEnergiaCompensada;
    consumption.contribuicaoMunicipal = fatura.contribuicaoMunicipal;
    consumption.consumoEnergiaEletrica =
      fatura.qtdEnergiaEletrica + fatura.qtdEnergiaSCEEE;
    consumption.energiaCompensada = fatura.qtdEnergiaCompensada;
    consumption.valorTotalSemGD =
      fatura.valorEnergiaEletrica +
      fatura.valorEnergiaSCEEE +
      fatura.contribuicaoMunicipal;
    consumption.economiaGD = fatura.valorEnergiaCompensada;

    return consumption;
  });

  console.log("Parse result: ", consumptions);

  if (options.save) {
    AppDataSource.initialize()
      .then(async () => {
        const UserConsumptionRepository =
          AppDataSource.getRepository(UserConsumption);
        await UserConsumptionRepository.save(consumptions);
        const d = await UserConsumptionRepository.find();
        console.log(d);
      })
      .catch((error) => console.log(error));
  }
});
