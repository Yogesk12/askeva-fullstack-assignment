import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Dropdown,
  Empty,
  Input,
  Modal,
  Row,
  Col,
  Select,
  Table,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import EmployeeForm from "./EmployeeForm";
import {
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/employee";
import dayjs from "dayjs";

const { Search } = Input;

const formatJoiningDate = (value) => {
  if (!value) return "-";

  const date =
    typeof value === "number"
      ? dayjs(value > 9999999999 ? value : value * 1000)
      : dayjs(value);

  return date.isValid() ? date.format("DD MMM YYYY") : "-";
};

const EmployeeTab = ({ employees, refresh, loading }) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const newestFirstEmployees = useMemo(() => {
    return [...employees].sort((a, b) => Number(b.id) - Number(a.id));
  }, [employees]);

  const filtered = newestFirstEmployees.filter((e) => {
    const name = e.EmployeeName || "";
    const email = e.Email || "";

    return (
      (!search ||
        name.toLowerCase().includes(search.toLowerCase()) ||
        email.toLowerCase().includes(search.toLowerCase())) &&
      (!dept || e.Department === dept) &&
      (!status || e.Status === status)
    );
  });

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      setActionError("");

      if (editing) {
        await updateEmployee(editing.id, values);
        message.success("Employee updated");
      } else {
        await addEmployee(values);
        message.success("Employee added");
      }

      setOpen(false);
      setEditing(null);
      await refresh();
    } catch (err) {
      setActionError("Unable to save employee. Please try again.");
      message.error("Save failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Delete employee?",
      content: "This employee will be removed from the dashboard.",
      okText: "Delete",
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          setActionError("");
          await deleteEmployee(id);
          message.success("Employee deleted");
          await refresh();
        } catch (err) {
          setActionError("Unable to delete employee. Please try again.");
          message.error("Delete failed");
          throw err;
        }
      },
    });
  };

  const columns = [
    { title: "Name", dataIndex: "EmployeeName" },
    { title: "Email", dataIndex: "Email" },
    { title: "Department", dataIndex: "Department" },
    {
      title: "Date of Join",
      dataIndex: "JoiningDate",
      render: formatJoiningDate,
    },
    { title: "Status", dataIndex: "Status" },
    {
      title: "Action",
      render: (_, r) => (
        <Dropdown
          trigger={["click", "hover"]}
          menu={{
            items: [
              {
                key: "edit",
                icon: <EditOutlined />,
                label: "Edit",
              },
              {
                key: "delete",
                danger: true,
                icon: <DeleteOutlined />,
                label: "Delete",
              },
            ],
            onClick: ({ key }) => {
              if (key === "edit") {
                setEditing(r);
                setOpen(true);
              }

              if (key === "delete") {
                handleDelete(r.id);
              }
            },
          }}
        >
          <Button
            aria-label="Employee actions"
            className="table-action-button"
            icon={<MoreOutlined />}
            type="text"
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      {actionError && (
        <Alert
          className="employee-alert"
          type="error"
          message={actionError}
          showIcon
          closable
          onClose={() => setActionError("")}
        />
      )}

      <Row gutter={12} className="employee-filters">
        <Col xs={24} sm={12} md={8}>
          <Search
            placeholder="Search by name or email"
            allowClear
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="Department"
            onChange={setDept}
            allowClear
            className="full-width"
            options={[...new Set(employees.map((e) => e.Department))].map(
              (d) => ({ label: d, value: d })
            )}
          />
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="Status"
            onChange={setStatus}
            allowClear
            className="full-width"
            options={[...new Set(employees.map((e) => e.Status))].map(
              (s) => ({ label: s, value: s })
            )}
          />
        </Col>

        <Col xs={24} sm={12} md={4}>
          <Button
            type="primary"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            block
          >
            Add
          </Button>
        </Col>
      </Row>

      <Table
        rowKey="id"
        dataSource={filtered}
        columns={columns}
        loading={loading}
        locale={{
          emptyText: (
            <Empty
              description={
                employees.length
                  ? "No employees match your filters"
                  : "No employees found"
              }
            />
          ),
        }}
      />

      <EmployeeForm
        open={open}
        initialValues={editing}
        confirmLoading={submitting}
        onCancel={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default EmployeeTab;
