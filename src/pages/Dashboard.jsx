import { Layout, Tabs } from "antd";
import Navbar from "../components/Navbar";
import AnalyticsTab from "../components/AnalyticsTab";
import EmployeeTab from "../components/EmployeeTab";
import { useEffect, useState } from "react";
import { getEmployees } from "../api/employee";

const { Content } = Layout;

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);

  const fetchData = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />

      <Content style={{ padding: 24 }}>
        <Tabs
          defaultActiveKey="1"
          type="card"
          items={[
            {
              key: "1",
              label: "📊 Analytics",
              children: <AnalyticsTab employees={employees} />,
            },
            {
              key: "2",
              label: "👨‍💼 Employees",
              children: (
                <EmployeeTab
                  employees={employees}
                  refresh={fetchData}
                />
              ),
            },
          ]}
        />
      </Content>
    </Layout>
  );
};

export default Dashboard;






// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   Button,
//   Modal,
//   message,
//   Spin,
//   Input,
//   Select,
//   Row,
//   Col,
// } from "antd";
// import axios from "axios";
// import EmployeeForm from "../components/EmployeeForm";

// const { Search } = Input;

// const API_URL =
//   "https://6819d8771ac115563506b0bc.mockapi.io/api/Employees";

// const Dashboard = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   const [departmentOptions, setDepartmentOptions] = useState([]);
//   const [statusOptions, setStatusOptions] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [editing, setEditing] = useState(null);

//   const [searchText, setSearchText] = useState("");
//   const [departmentFilter, setDepartmentFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");

//   // Fetch Employees
//   const loadData = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(API_URL);

//       const employees = res.data;

//       setData(employees);
//       setFilteredData(employees);

//       const departments = [
//         ...new Set(employees.map((emp) => emp.Department)),
//       ]
//         .filter(Boolean)
//         .map((dept) => ({
//           label: dept,
//           value: dept,
//         }));

//       setDepartmentOptions(departments);

//       // Status Options
//       const statuses = [
//         ...new Set(employees.map((emp) => emp.Status)),
//       ]
//         .filter(Boolean)
//         .map((status) => ({
//           label: status,
//           value: status,
//         }));

//       setStatusOptions(statuses);
//     } catch (error) {
//       message.error("Failed to fetch employees");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   // Search & Filter
//   const applyFilters = (
//     search = searchText,
//     department = departmentFilter,
//     status = statusFilter
//   ) => {
//     let filtered = [...data];

//     if (search) {
//       filtered = filtered.filter(
//         (emp) =>
//           emp.EmployeeName?.toLowerCase().includes(search.toLowerCase()) ||
//           emp.Email?.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (department) {
//       filtered = filtered.filter(
//         (emp) => emp.Department === department
//       );
//     }

//     if (status) {
//       filtered = filtered.filter(
//         (emp) => emp.Status === status
//       );
//     }

//     setFilteredData(filtered);
//   };

//   const handleSearch = (value) => {
//     setSearchText(value);
//     applyFilters(value, departmentFilter, statusFilter);
//   };

//   const handleDepartmentFilter = (value) => {
//     const dept = value || "";
//     setDepartmentFilter(dept);
//     applyFilters(searchText, dept, statusFilter);
//   };

//   const handleStatusFilter = (value) => {
//     const stat = value || "";
//     setStatusFilter(stat);
//     applyFilters(searchText, departmentFilter, stat);
//   };

//   // Add / Edit
//   const handleSubmit = async (values) => {
//     try {
//       if (editing) {
//         await axios.put(`${API_URL}/${editing.id}`, values);
//         message.success("Employee updated successfully");
//       } else {
//         await axios.post(API_URL, values);
//         message.success("Employee added successfully");
//       }

//       setOpen(false);
//       setEditing(null);

//       await loadData();
//     } catch (error) {
//       message.error("Operation failed");
//     }
//   };

//   // Delete
//   const handleDelete = (id) => {
//     Modal.confirm({
//       title: "Delete Employee",
//       content: "Are you sure you want to delete this employee?",
//       okText: "Delete",
//       cancelText: "Cancel",

//       onOk: async () => {
//         try {
//           await axios.delete(`${API_URL}/${id}`);
//           message.success("Employee deleted");

//           loadData();
//         } catch (error) {
//           message.error("Delete failed");
//         }
//       },
//     });
//   };

//   const columns = [
//     {
//       title: "Employee Name",
//       dataIndex: "EmployeeName",
//     },
//     {
//       title: "Email",
//       dataIndex: "Email",
//     },
//     {
//       title: "Department",
//       dataIndex: "Department",
//     },
//     {
//       title: "Designation",
//       dataIndex: "Designation",
//     },
//     {
//       title: "Status",
//       dataIndex: "Status",
//     },
//     {
//       title: "Joining Date",
//       dataIndex: "JoiningDate",
//       render: (value) =>
//         value
//           ? new Date(value * 1000).toLocaleDateString("en-IN")
//           : "-",
//     },
//     {
//       title: "Actions",
//       render: (_, record) => (
//         <>
//           <Button
//             type="link"
//             onClick={() => {
//               setEditing(record);
//               setOpen(true);
//             }}
//           >
//             Edit
//           </Button>

//           <Button
//             danger
//             type="link"
//             onClick={() => handleDelete(record.id)}
//           >
//             Delete
//           </Button>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: 20 }}>
//       <Row gutter={16} style={{ marginBottom: 20 }}>
//         <Col span={8}>
//           <Search
//             placeholder="Search by Name or Email"
//             allowClear
//             onChange={(e) => handleSearch(e.target.value)}
//           />
//         </Col>

//         <Col span={6}>
//           <Select
//             placeholder="Department"
//             allowClear
//             style={{ width: "100%" }}
//             onChange={handleDepartmentFilter}
//             // options={[
//             //   { value: "IT", label: "IT" },
//             //   { value: "HR", label: "HR" },
//             //   { value: "Finance", label: "Finance" },
//             //   { value: "Sales", label: "Sales" },
//             // ]}
//             options={departmentOptions}
//             optionFilterProp="label"
//           />
//         </Col>

//         <Col span={6}>
//           <Select
//             placeholder="Status"
//             allowClear
//             style={{ width: "100%" }}
//             onChange={handleStatusFilter}
//             // options={[
//             //   { value: "Active", label: "Active" },
//             //   { value: "Inactive", label: "Inactive" },
//             // ]}
//             options={statusOptions}
//           />
//         </Col>

//         <Col span={4}>
//           <Button
//             type="primary"
//             block
//             onClick={() => {
//               setEditing(null);
//               setOpen(true);
//             }}
//           >
//             Add Employee
//           </Button>
//         </Col>
//       </Row>

//       {loading ? (
//         <Spin size="large" />
//       ) : (
//         <Table
//           columns={columns}
//           dataSource={filteredData}
//           rowKey="id"
//           pagination={{
//             pageSize: 10,
//             showSizeChanger: false,
//           }}
//         />
//       )}

//       <EmployeeForm
//         key={editing ? editing.id : "new"}
//         open={open}
//         initialValues={editing}
//         onSubmit={handleSubmit}
//         onCancel={() => {
//           setOpen(false);
//           setEditing(null);
//         }}
//       />
//     </div>
//   );
// };

// export default Dashboard;
