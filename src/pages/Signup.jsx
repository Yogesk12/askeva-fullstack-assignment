import React, { useContext, useState } from "react";
import { Alert, Button, Card, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { addEmployee } from "../api/employee";
import { AuthContext } from "../context/AuthContext";
import { createSessionToken } from "../utils/token";

const Signup = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onFinish = async (values) => {
    try {
      setLoading(true);
      setError("");

      const res = await addEmployee(values);
      const token = createSessionToken(res.data);

      login(token);
      message.success("Signup successful");
      navigate("/dashboard");
    } catch (err) {
      setError("Unable to create your account. Please try again.");
      message.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Card title="Create Account" className="login-card">
        {error && (
          <Alert
            className="login-alert"
            type="error"
            message={error}
            showIcon
            closable
            onClose={() => setError("")}
          />
        )}

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="EmployeeName"
            rules={[{ required: true, message: "Enter your name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="Email"
            rules={[
              { required: true, message: "Enter email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="Password"
            rules={[{ required: true, message: "Enter password" }]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            Sign Up
          </Button>
        </Form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Card>
    </div>
  );
};

export default Signup;
