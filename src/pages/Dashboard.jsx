import SemesterBarChart from "@/components/ui/SemesterBarChart";
import LineChartComponent from "@/components/ui/LineChartComponent";
import PieChartComponent from "@/components/ui/PieChartComponent";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <SemesterBarChart />

      <div className="bg-black grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <PieChartComponent />
        <LineChartComponent />
      </div>
    </div>
  );
};

export default Dashboard;
