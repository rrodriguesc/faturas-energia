#! /usr/bin/env node

import { Command } from "commander";
import fs from "fs";
import parseFile from "./parseFile";
import { FaturaDoc } from "./models/FaturaDoc";
import { config } from "dotenv";

config();

const SAVE_URL = process.env.SAVE_URL || "http://localhost:3000/faturas";

const save = async (fatura: FaturaDoc) =>
  fetch(SAVE_URL, {
    method: "POST",
    body: JSON.stringify(fatura),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

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

Promise.all(files.map((path) => parseFile(path))).then((faturas) => {
  console.log(faturas.length, " Items parsed");
  if (!options.save) {
    console.log(faturas);
    return;
  }
  Promise.all(faturas.map((fatura) => save(fatura)))
    .then((res) => {
      const errors = res.filter((r) => r.status !== 201);
      if (errors.length > 0) {
        const distinctErrors = [...new Set(errors)];
        console.error(`Error to save ${errors.length} items `, distinctErrors);
      }
      console.log(faturas.length - errors.length, " Items saved");
    })
    .catch((err) => {
      console.error("Error saving ", err);
    });
});
