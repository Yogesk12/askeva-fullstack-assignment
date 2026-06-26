import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, Row, Col } from "antd";

const COLORS = ["#1677ff", "#52c41a", "#faad14", "#ff4d4f"];

const EmployeeCharts = ({ employees }) => {
  const deptData = Object.values(
    employees.reduce((acc, emp) => {
      acc[emp.Department] = acc[emp.Department] || {
        name: emp.Department,
        value: 0,
      };
      acc[emp.Department].value++;
      return acc;
    }, {})
  );

  const statusData = Object.values(
    employees.reduce((acc, emp) => {
      acc[emp.Status] = acc[emp.Status] || {
        name: emp.Status,
        value: 0,
      };
      acc[emp.Status].value++;
      return acc;
    }, {})
  );

  return (
    <Row gutter={16} className="charts-row">
      <Col xs={24} lg={12}>
        <Card title="Department Wise">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deptData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1677ff" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Col>

      <Col xs={24} lg={12}>
        <Card title="Status Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={statusData} dataKey="value" outerRadius={100}>
                {statusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </Row>
  );
};

export default EmployeeCharts;
