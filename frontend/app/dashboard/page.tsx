import ReportChart from "@/components/ReportChart";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Dashboard = () => {
  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 text-xl">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          Dashboard
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Separator className="my-2" />
        <div className="grid auto-rows-min gap-4 md:grid-cols-2 xl:grid-cols-3">
          <ReportChart key="1" />
          <ReportChart key="2" />
          <ReportChart key="3" />
          <ReportChart key="4" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
