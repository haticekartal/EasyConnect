import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined, ShopOutlined } from "@ant-design/icons";
import easyconnectLogo from "../assets/easyconnectlogo.svg";
import isletmeLogo from "../assets/isletmelogo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isIsletmePage = location.pathname === "/isletme";

  const user = JSON.parse(localStorage.getItem("user"));
  const business = JSON.parse(localStorage.getItem("business"));

  const handleLogoutUser = () => {
    localStorage.removeItem("user");
    navigate("/giris");
  };

  const handleLogoutBusiness = () => {
    localStorage.removeItem("business");
    navigate("/isletme");
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logoContainer}>
        <img src={easyconnectLogo} alt="EasyConnect Logo" style={styles.logo} />
      </Link>

      <Menu mode="horizontal" style={styles.menu}>
        {isIsletmePage ? (
          <>
            <Menu.Item key="ozellikler">
              <Link to="/ozellikler" style={styles.menuItem}>ÖZELLİKLER</Link>
            </Menu.Item>
            <Menu.Item key="biz-kimiz">
              <Link to="/biz-kimiz" style={styles.menuItem}>BİZ KİMİZ</Link>
            </Menu.Item>
            <Menu.Item key="bize-ulasin">
              <Link to="/bize-ulasin" style={styles.menuItem}>BİZE ULAŞIN</Link>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="home">
              <Link to="/" style={styles.menuItem}>ANA SAYFA</Link>
            </Menu.Item>
            <Menu.Item key="hizmetler">
              <Link to="/hizmetler" style={styles.menuItem}>HİZMETLERİMİZ</Link>
            </Menu.Item>

            {/* Kullanıcı varsa */}
            {user && (
              <Menu.SubMenu
                key="user"
                title={<><UserOutlined /> {user.fullName}</>}
                style={styles.menuItem}
              >
                <Menu.Item key="logoutUser" icon={<LogoutOutlined />} onClick={handleLogoutUser}>
                  ÇIKIŞ YAP
                </Menu.Item>
              </Menu.SubMenu>
            )}

            {/* İşletme varsa */}
            {business && (
              <Menu.SubMenu
                key="business"
                title={<><ShopOutlined /> {business.businessName}</>}
                style={styles.menuItem}
              >
                <Menu.Item key="logoutBusiness" icon={<LogoutOutlined />} onClick={handleLogoutBusiness}>
                  ÇIKIŞ YAP
                </Menu.Item>
              </Menu.SubMenu>
            )}

            {/* Kullanıcı ve işletme yoksa */}
            {!user && !business && (
              <>
                <Menu.Item key="kaydol">
                  <Link to="/kaydol" style={styles.menuItem}>KAYIT OL</Link>
                </Menu.Item>
                <Menu.Item key="giris">
                  <Link to="/giris" style={styles.menuItem}>GİRİŞ YAP</Link>
                </Menu.Item>
                <Menu.Item key="isletme">
                  <Link to="/isletme" style={styles.menuItem}>
                    <img src={isletmeLogo} alt="İşletme Logo" style={styles.isletmeLogo} />
                    İŞLETME GİRİŞİ
                  </Link>
                </Menu.Item>
              </>
            )}
          </>
        )}
      </Menu>
    </nav>
  );
};

const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    zIndex: 1000,
    backgroundColor: "#283646",
    borderBottom: "none",
  },
  logoContainer: {
    textDecoration: "none",
  },
  logo: {
    height: "50px",
  },
  menu: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    borderBottom: "none",
  },
  menuItem: {
    color: "white",
    fontFamily: "'Crimson Text', serif",
  },
  isletmeLogo: {
    height: "20px",
    marginRight: "8px",
  },
};

export default Navbar;
