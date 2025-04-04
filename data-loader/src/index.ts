#! /usr/bin/env node

import { Command } from "commander";
import { promises } from "fs";
import fs from "fs";
import parseFile from "./parseFile";
import { FaturaDoc } from "./models/FaturaDoc";
import { config } from "dotenv";
import { put } from "@vercel/blob";
import path from "path";

config();

const SAVE_URL = process.env.SAVE_URL || "http://localhost:3000/faturas";
const BLOB_FOLDER = process.env.BLOB_FOLDER || "faturasEnergia";

type EnvMode = "prod" | "local";

const uploadFile = async (
  filepath: string,
  envMode: EnvMode
): Promise<string> => {
  if (envMode === "local") {
    return `file://${filepath}`;
  }
  const buffer = await promises.readFile(filepath);
  const blob = await put(`${BLOB_FOLDER}/${path.basename(filepath)}`, buffer, {
    access: "public",
  });
  return blob.downloadUrl;
};

const save = async (fatura: FaturaDoc & { url: string }) =>
  fetch(SAVE_URL, {
    method: "POST",
    body: JSON.stringify(fatura),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

const parseAndUploadFile = async (path: string, mode: EnvMode) => {
  const fatura = await parseFile(path);
  const url = await uploadFile(path, mode);
  return { ...fatura, url };
};

interface Options {
  directory?: string;
  file?: string;
  save: boolean;
  mode: EnvMode;
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
        files.push(path.normalize(`${file.parentPath}/${file.name}`));
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
  .option("-m, --mode [value]", "Mode to upload file: local | prod", "local")
  .parse(process.argv);

const options = program.opts<Options>();

const files = getFiles(options);

console.log("Mode: ", options.mode);

Promise.all(files.map((path) => parseAndUploadFile(path, options.mode))).then(
  (faturas) => {
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
          console.error(
            `Error to save ${errors.length} items `,
            distinctErrors
          );
        }
        console.log(faturas.length - errors.length, " Items saved");
      })
      .catch((err) => {
        console.error("Error saving ", err);
      });
  }
);
