import { Layout, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/token";

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <Header
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 9

      }}
    >
      <h2>Pulse HR</h2>

      <Button danger icon={<LogoutOutlined />} onClick={logout}>
        Logout
      </Button>
    </Header>
  );
};

export default Navbar;