# data-loader

Utiliza bibliotecas em Node.js para extração de informações de documentos PDF.

1. Navegue até a pasta `data-loader`:

   ```bash
   cd data-loader
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Faça o build da aplicação:

   ```bash
   npm run build
   ```

4. Configure as variáveis de ambiente no arquivo `.env` como o `.env.example` disponibilizado, incluindo a url do backend a as informações necessárias para o upload do arquivo no blob storage .

5. Envie arquivos ou diretórios inteiros com:

   ```bash
   loadFile -d <directory> -m prod // ou loadFile -f <./caminho/arquivo> -m prod
   ```

6. Veja a ajuda se necessário

   ```bash
   loadFile --help
   ```

   ```bash
   Usage: loadFile [options]

   Faturas em PDF parser

   Options:
   -V, --version             output the version number
   -d, --directory  [value]  Directory to parse
   -f, --file [value]        Single file to parse
   -s, --save                Save to database (default: true)
   -m, --mode [value]        Mode to upload file: local | prod (default: "local")
   -h, --help                display help for command
   ```
