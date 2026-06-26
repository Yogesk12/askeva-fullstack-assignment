import React, { useState } from "react";
import { Table, Button, Input, Select, Row, Col, Modal, message } from "antd";
import EmployeeForm from "./EmployeeForm";
import {
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/employee";

const { Search } = Input;

const EmployeeTab = ({ employees, refresh }) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("");
  const [status, setStatus] = useState("");

  const filtered = employees.filter((e) => {
    return (
      (!search ||
        e.EmployeeName.toLowerCase().includes(search.toLowerCase()) ||
        e.Email.toLowerCase().includes(search.toLowerCase())) &&
      (!dept || e.Department === dept) &&
      (!status || e.Status === status)
    );
  });

  const handleSubmit = async (values) => {
    if (editing) {
      await updateEmployee(editing.id, values);
      message.success("Updated");
    } else {
      await addEmployee(values);
      message.success("Added");
    }

    setOpen(false);
    setEditing(null);
    refresh();
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Delete?",
      onOk: async () => {
        await deleteEmployee(id);
        message.success("Deleted");
        refresh();
      },
    });
  };

  const columns = [
    { title: "Name", dataIndex: "EmployeeName" },
    { title: "Email", dataIndex: "Email" },
    { title: "Department", dataIndex: "Department" },
    { title: "Status", dataIndex: "Status" },
    {
      title: "Action",
      render: (_, r) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setEditing(r);
              setOpen(true);
            }}
          >
            Edit
          </Button>
          <Button danger type="link" onClick={() => handleDelete(r.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Row gutter={12} style={{ marginBottom: 20, width:"50%" }}>
        <Col span={8}>
          <Search onChange={(e) => setSearch(e.target.value)} />
        </Col>

        <Col span={6}>
          <Select
            placeholder="Department"
            onChange={setDept}
            allowClear
            style={{ width: "100%" }}
            options={[...new Set(employees.map((e) => e.Department))].map(
              (d) => ({ label: d, value: d })
            )}
          />
        </Col>

        <Col span={6}>
          <Select
            placeholder="Status"
            onChange={setStatus}
            allowClear
            style={{ width: "100%" }}
            options={[...new Set(employees.map((e) => e.Status))].map(
              (s) => ({ label: s, value: s })
            )}
          />
        </Col>

        <Col span={4}>
          <Button type="primary" onClick={() => setOpen(true)} block>
            Add
          </Button>
        </Col>
      </Row>

      <Table rowKey="id" dataSource={filtered} columns={columns} />

      <EmployeeForm
        open={open}
        initialValues={editing}
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