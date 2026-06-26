import { Alert, Button, Layout, Tabs } from "antd";
import { BarChartOutlined, TeamOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import AnalyticsTab from "../components/AnalyticsTab";
import EmployeeTab from "../components/EmployeeTab";
import { useEffect, useState } from "react";
import { getEmployees } from "../api/employee";

const { Content } = Layout;

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      setError("Unable to load employees. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tabItems = [
    {
      key: "analytics",
      label: (
        <span>
          <BarChartOutlined />
          Analytics
        </span>
      ),
      children: <AnalyticsTab employees={employees} loading={loading} />,
    },
    {
      key: "employees",
      label: (
        <span>
          <TeamOutlined />
          Employees
        </span>
      ),
      children: (
        <EmployeeTab
          employees={employees}
          refresh={fetchData}
          loading={loading}
        />
      ),
    },
  ];

  return (
    <Layout className="app-shell">
      <Navbar />

      <Content className="app-content">
        {error && (
          <Alert
            className="dashboard-alert"
            type="error"
            message={error}
            showIcon
            action={
              <Button size="small" danger onClick={fetchData}>
                Retry
              </Button>
            }
          />
        )}

        <Tabs
          className="dashboard-tabs"
          defaultActiveKey="analytics"
          items={tabItems}
        />
      </Content>
    </Layout>
  );
};

export default Dashboard;
