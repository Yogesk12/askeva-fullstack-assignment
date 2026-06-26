import DashboardCards from "./DashboardCards";
import EmployeeCharts from "./EmployeeCharts";

const AnalyticsTab = ({ employees }) => {
  return (
    <>
      <DashboardCards employees={employees} />
      <EmployeeCharts employees={employees} />
    </>
  );
};

export default AnalyticsTab;