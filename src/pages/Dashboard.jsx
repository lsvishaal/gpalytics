import SemesterBarChart from "@/components/ui/SemesterBarChart";
import LineChartComponent from "@/components/ui/LineChartComponent";
import PieChartComponent from "@/components/ui/PieChartComponent";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center w-full bg-black text-white px-4 md:px-8 py-8 space-y-8">
      <h1 className="text-3xl md:text-5xl font-extrabold text-yellow-400 text-center">
        Dashboard

      </h1>
      <SemesterBarChart />
      {/* Charts Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <PieChartComponent />
        <LineChartComponent />
      </div>
      {/* Bar Chart */}
      
    </div>
  );
};

export default Dashboard;
