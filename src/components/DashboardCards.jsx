import { Card, Row, Col } from "antd";

const DashboardCards = ({ employees }) => {
  const total = employees.length;

  const active = employees.filter((e) => e.Status === "Active").length;

  const departments = new Set(employees.map((e) => e.Department)).size;

  const joinedThisMonth = employees.filter((e) => {
    const date = new Date(e.JoiningDate * 1000);
    return date.getMonth() === new Date().getMonth();
  }).length;

  const cards = [
    { title: "Total Employees", value: total },
    { title: "Active", value: active },
    { title: "Departments", value: departments },
    { title: "Joined This Month", value: joinedThisMonth },
  ];

  return (
    <Row gutter={16}>
      {cards.map((c) => (
        <Col xs={24} sm={12} lg={6} key={c.title}>
          <Card>
            <h3>{c.title}</h3>
            <h2>{c.value}</h2>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DashboardCards;
