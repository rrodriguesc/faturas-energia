export type Fatura = {
  id: string;
  nCliente: string;
  year: number;
  jan?: string;
  feb?: string;
  mar?: string;
  apr?: string;
  may?: string;
  jun?: string;
  jul?: string;
  aug?: string;
  sep?: string;
  oct?: string;
  nov?: string;
  dec?: string;
};

export const getFaturas = async (): Promise<Fatura[]> => {
  return [
    {
      id: "728ed52f",
      nCliente: "123456",
      year: 2024,
      jan: "http://localhost/faturas",
      feb: "http://localhost/faturas",
      mar: "http://localhost/faturas",
      apr: "http://localhost/faturas",
      may: "http://localhost/faturas",
      jun: "http://localhost/faturas",
    },
    {
      id: "728ed53f",
      nCliente: "123456",
      year: 2023,
      jan: "http://localhost/faturas",
      feb: "http://localhost/faturas",
      mar: "http://localhost/faturas",
      apr: "http://localhost/faturas",
      may: "http://localhost/faturas",
      jun: "http://localhost/faturas",
      jul: "http://localhost/faturas",
      aug: "http://localhost/faturas",
      sep: "http://localhost/faturas",
      oct: "http://localhost/faturas",
      nov: "http://localhost/faturas",
      dec: "http://localhost/faturas",
    },
    {
      id: "728ed52g",
      nCliente: "789101",
      year: 2024,
      jan: "http://localhost/faturas",
      feb: "http://localhost/faturas",
      mar: "http://localhost/faturas",
      apr: "http://localhost/faturas",
      may: "http://localhost/faturas",
      jun: "http://localhost/faturas",
    },
    {
      id: "728ed53h",
      nCliente: "789101",
      year: 2023,
      jan: "http://localhost/faturas",
      feb: "http://localhost/faturas",
      mar: "http://localhost/faturas",
      apr: "http://localhost/faturas",
      may: "http://localhost/faturas",
      jun: "http://localhost/faturas",
      jul: "http://localhost/faturas",
      aug: "http://localhost/faturas",
      sep: "http://localhost/faturas",
      oct: "http://localhost/faturas",
      nov: "http://localhost/faturas",
      dec: "http://localhost/faturas",
    },
    {
      id: "728ed52i",
      nCliente: "123456",
      year: 2024,
      jan: "http://localhost/faturas",
      feb: "http://localhost/faturas",
      mar: "http://localhost/faturas",
      apr: "http://localhost/faturas",
      may: "http://localhost/faturas",
      jun: "http://localhost/faturas",
    },
    {
      id: "728ed53i",
      nCliente: "123456",
      year: 2023,
      jan: "http://localhost/faturas",
      feb: "http://localhost/faturas",
      mar: "http://localhost/faturas",
      apr: "http://localhost/faturas",
      may: "http://localhost/faturas",
      jun: "http://localhost/faturas",
      jul: "http://localhost/faturas",
      aug: "http://localhost/faturas",
      sep: "http://localhost/faturas",
      oct: "http://localhost/faturas",
      nov: "http://localhost/faturas",
      dec: "http://localhost/faturas",
    },
    {
      id: "728ed52j",
      nCliente: "151617",
      year: 2024,
      jan: "http://localhost/faturas",
      feb: "http://localhost/faturas",
      mar: "http://localhost/faturas",
      apr: "http://localhost/faturas",
      may: "http://localhost/faturas",
    },
    {
      id: "728ed53j",
      nCliente: "151617",
      year: 2023,
      jan: "http://localhost/faturas",
      feb: "http://localhost/faturas",
      mar: "http://localhost/faturas",
      apr: "http://localhost/faturas",
      may: "http://localhost/faturas",
      jun: "http://localhost/faturas",
      jul: "http://localhost/faturas",
      aug: "http://localhost/faturas",
      sep: "http://localhost/faturas",
      oct: "http://localhost/faturas",
      nov: "http://localhost/faturas",
      dec: "http://localhost/faturas",
    },
    {
      id: "728ed52k",
      nCliente: "123456",
      year: 2024,
      jan: "http://localhost/faturas",
      feb: "http://localhost/faturas",
      mar: "http://localhost/faturas",
      apr: "http://localhost/faturas",
      may: "http://localhost/faturas",
    },
  ];
};
