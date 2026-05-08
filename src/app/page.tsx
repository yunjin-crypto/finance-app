import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KPISection from "@/components/dashboard/KPISection";
import Toolbar from "@/components/dashboard/Toolbar";
import ChartGrid from "@/components/dashboard/ChartGrid";
import RecordTable from "@/components/dashboard/RecordTable";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto p-6 space-y-6">

        <DashboardHeader />

        <KPISection />

        <Toolbar />

        <ChartGrid />

        <RecordTable />

      </div>
    </main>
  );
}