import { Layout, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/token";
import logo from "../styles/logo.jpg";

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <Header className="navbar-header">
      <div className="navbar-brand">
        <img src={logo} alt="ASK EVA logo" className="navbar-logo" />
        <h2>ASK EVA</h2>
      </div>

      <Button danger icon={<LogoutOutlined />} onClick={logout}>
        Logout
      </Button>
    </Header>
  );
};

export default Navbar;
