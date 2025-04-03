import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboardIcon, ListIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 text-xl">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          Faturas de Energia - Página Inicial
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Separator className="my-2" />
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/dashboard">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>
                  Veja o painel completo com agregações sobre as faturas de
                  energia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LayoutDashboardIcon />
              </CardContent>
            </Card>
          </Link>
          <Link href="/biblioteca">
            <Card>
              <CardHeader>
                <CardTitle>Biblioteca</CardTitle>
                <CardDescription>
                  Consulte e baixe qualquer fatura armazenada facilmente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ListIcon />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
