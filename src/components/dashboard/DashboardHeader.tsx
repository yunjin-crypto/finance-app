export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Finance Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          Track your income and expenses
        </p>
      </div>
    </div>
  );
}