import SemesterBarChart from "@/components/ui/SemesterBarChart";
import LineChartComponent from "@/components/ui/LineChartComponent";
import PieChartComponent from "@/components/ui/PieChartComponent";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Bar Chart */}
      <SemesterBarChart />

      {/* Pie Chart and Line Chart */}
      <div className="bg-black grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <PieChartComponent />
        <LineChartComponent />
      </div>
    </div>
  );
};

export default Dashboard;
