import { useState } from "react";
import "./sidebar.css";
import { Layout } from "antd";
import Logo from "../Logo/logo";
import MenuList from "../Menu/menuList";
import Navbar from "../Navigation/navbar";


const {Sider } = Layout;
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout>
      <Navbar/>
      <Sider className="ant-layout-sider sidebar"
        collapsed={collapsed}
        collapsible
        trigger={null}
        onMouseEnter={()=>{setCollapsed(false)}}
        onMouseLeave={() => { setCollapsed(true) }}>
        <div className="logo-ss">
          <Logo />
          {!collapsed && <p>SCHOLARSPHERE</p>}
        </div>
        <MenuList />
      </Sider>
    </Layout>
  );
};

export default Sidebar;
