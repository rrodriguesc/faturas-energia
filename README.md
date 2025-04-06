# faturas-energia

O projeto **Faturas Energia** é uma aplicação web desenvolvida para automatizar a leitura, extração e gerenciamento de dados de faturas de energia elétrica. Ele permite que usuários carreguem faturas em formato PDF, extraia automaticamente as informações relevantes e visualize os dados por meio de uma interface intuitiva.

## Funcionalidades

- **Upload de Faturas**: Permite o envio de faturas de energia elétrica em formato PDF para processamento.
- **Extração Automática de Dados**: Extrai informações chave das faturas, como consumo de energia, valor total, data de vencimento, entre outros.
- **Armazenamento em Banco de Dados**: Os dados extraídos são armazenados em um banco de dados PostgreSQL para fácil acesso e gerenciamento.
- **Visualização e Análise**: Disponibiliza uma interface web para visualizar as faturas processadas, permitindo filtragem por período, cliente ou outros critérios relevantes.

## Tecnologias Utilizadas

- **Frontend**: Desenvolvido com React.js Next.js, proporcionando uma interface dinâmica e responsiva para interação com o usuário.
- **Backend**: Implementado com Nest.js, responsável pela comunicação com o banco de dados.
- **Banco de Dados**: PostgreSQL, utilizado para armazenar os dados extraídos das faturas.
- **Extração de Dados**: Utiliza bibliotecas em Node.js para extração de informações de documentos PDF.

## Instalação e Configuração

### Pré-requisitos

- Node.js e npm instalados.
- Banco de dados PostgreSQL configurado.

### Backend

1. Navegue até a pasta `backend`:

   ```bash
   cd backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env` como o `.env.example` disponibilizado, incluindo as credenciais do banco de dados.

4. Inicie o servidor:

   ```bash
   npm start
   ```

### Frontend

1. Navegue até a pasta `frontend`:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install --force
   ```

3. Configure as variáveis de ambiente no arquivo `.env` como o `.env.example` disponibilizado, incluindo a url do backend.

4. Inicie a aplicação:

   ```bash
   npm start
   ```

A aplicação estará disponível em `http://localhost:3000`.

### data-loader

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

## Uso

1. Envie os arquivos usando o `loadFile`.
2. Após o processamento, visualize as faturas e seus dados extraídos no Dashboard e na lista disponível.
3. Utilize os filtros para buscar faturas específicas ou analisar dados conforme necessário.
