import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";

const EmployeeForm = ({ open, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

 
  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [open, initialValues, form]);

  return (
    <Modal
      open={open}
      title={initialValues ? "Edit Employee" : "Add Employee"}
      destroyOnClose
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item name="EmployeeName" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="Email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="Department" label="Department">
          <Input />
        </Form.Item>

        <Form.Item name="Designation" label="Designation">
          <Input />
        </Form.Item>

        <Form.Item name="Status" label="Status">
          <Select>
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="Inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="JoiningDate" label="Joining Date">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmployeeForm;