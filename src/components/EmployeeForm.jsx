import React, { useEffect } from "react";
import { DatePicker, Modal, Form, Input, Select } from "antd";
import dayjs from "dayjs";

const getDateValue = (value) => {
  if (!value) return null;

  if (dayjs.isDayjs(value)) return value;

  if (typeof value === "number") {
    const timestamp = value > 9999999999 ? value : value * 1000;
    return dayjs(timestamp);
  }

  return dayjs(value);
};

const EmployeeForm = ({
  open,
  onCancel,
  onSubmit,
  initialValues,
  confirmLoading,
}) => {
  const [form] = Form.useForm();

 
  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          JoiningDate: getDateValue(initialValues.JoiningDate),
        });
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
      confirmLoading={confirmLoading}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) =>
          onSubmit({
            ...values,
            JoiningDate: values.JoiningDate
              ? values.JoiningDate.startOf("day").unix()
              : undefined,
          })
        }
      >
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
          <DatePicker className="full-width" format="DD MMM YYYY" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmployeeForm;
