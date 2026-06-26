import { Empty, Spin } from "antd";
import DashboardCards from "./DashboardCards";
import EmployeeCharts from "./EmployeeCharts";

const AnalyticsTab = ({ employees, loading }) => {
  if (loading) {
    return <Spin className="centered-state" />;
  }

  if (!employees.length) {
    return (
      <Empty
        className="centered-state"
        description="No employee data available for analytics"
      />
    );
  }

  return (
    <>
      <DashboardCards employees={employees} />
      <EmployeeCharts employees={employees} />
    </>
  );
};

export default AnalyticsTab;
