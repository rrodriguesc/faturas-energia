import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Fatura, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Fatura[]> {
  return [
    {
      id: "728ed52f",
      nCliente: "123456",
      jan: "http://localhost/faturas",
      feb: "http://localhost/faturas",
      mar: "http://localhost/faturas",
      apr: "http://localhost/faturas",
      may: "http://localhost/faturas",
      jun: "http://localhost/faturas",
    },
    {
      id: "728ed52g",
      nCliente: "789101",
      jan: "http://localhost/faturas",
      feb: "http://localhost/faturas",
      mar: "http://localhost/faturas",
      apr: "http://localhost/faturas",
      may: "http://localhost/faturas",
      jun: "http://localhost/faturas",
    },
    {
      id: "728ed52h",
      nCliente: "1213114",
      jan: "http://localhost/faturas",
      feb: "http://localhost/faturas",
      mar: "http://localhost/faturas",
      apr: "http://localhost/faturas",
      may: "http://localhost/faturas",
      jun: "http://localhost/faturas",
    },
    {
      id: "728ed52i",
      nCliente: "123456",
      jan: "http://localhost/faturas",
      feb: "http://localhost/faturas",
      mar: "http://localhost/faturas",
      apr: "http://localhost/faturas",
      may: "http://localhost/faturas",
      jun: "http://localhost/faturas",
    },
    {
      id: "728ed52j",
      nCliente: "151617",
      jan: "http://localhost/faturas",
      feb: "http://localhost/faturas",
      mar: "http://localhost/faturas",
      apr: "http://localhost/faturas",
      may: "http://localhost/faturas",
    },
    {
      id: "728ed52k",
      nCliente: "123456",
      jan: "http://localhost/faturas",
      feb: "http://localhost/faturas",
      mar: "http://localhost/faturas",
      apr: "http://localhost/faturas",
      may: "http://localhost/faturas",
    },
  ];
}

const Faturas = async () => {
  const data = await getData();

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 text-xl">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          Faturas
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Faturas;
