import React, { useState } from "react";
import "./sidebar.css";
import { Button,Layout } from "antd";
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
        onMouseLeave={()=>{setCollapsed(true)}}>        
        <Logo />
        <MenuList />
      </Sider>
    </Layout>
  );
};

export default Sidebar;
