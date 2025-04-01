#! /usr/bin/env node

import { Command } from "commander";
import fs from "fs";
import parseFile from "./parseFile";

interface Options {
  directory?: string;
  file?: string;
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
  .parse(process.argv);

const options = program.opts<Options>();

const files = getFiles(options);

Promise.all(files.map((f) => parseFile(f))).then((res) => {
  res.forEach((fatura) => console.log(fatura));
});
