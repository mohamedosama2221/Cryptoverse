import React, { useEffect, useState } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";

import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import icon from "../../assets/images/cryptocurrency.png";
import { useNavbarContext } from "../../context/navbarContext";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const { selectedIndex, setSelectedIndex } = useNavbarContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const menuItems = [
    {
      to: "Home",
      icon: <HomeOutlined />,
    },
    {
      to: "Cryptocurrencies",
      icon: <FundOutlined />,
    },
    {
      to: "Exchanges",
      icon: <MoneyCollectOutlined />,
    },
    {
      to: "news",
      icon: <BulbOutlined />,
    },
  ];
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link
            to="/"
            onClick={() => {
              setSelectedIndex("0");
            }}
          >
            Cryptoverse
          </Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu
          theme="dark"
          defaultSelectedKeys={["0"]}
          selectedKeys={[selectedIndex]}
        >
          {menuItems.map(({ to, icon }, index) => (
            <Menu.Item icon={icon} key={index}>
              <Link
                to={index ? `/${to}` : "/"}
                onClick={() => {
                  setSelectedIndex(index.toString());
                }}
              >
                {to}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
