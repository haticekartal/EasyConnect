import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import easyconnectLogo from "../assets/easyconnectlogo.svg"; // Genel logo
import isletmeLogo from "../assets/isletmelogo.png"; // İşletme logosu

const Navbar = () => {
  const location = useLocation();
  const isIsletmePage = location.pathname === "/isletme"; // İşletme sayfasında mıyız?

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <Link to="/" style={styles.logoContainer}>
        <img src={easyconnectLogo} alt="EasyConnect Logo" style={styles.logo} />
      </Link>

      {/* Menü */}
      <Menu mode="horizontal" style={styles.menu}>
        {isIsletmePage ? (
          // İşletme sayfasına özel menü
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
          // Normal ana sayfa menüsü
          <>
            <Menu.Item key="home">
              <Link to="/" style={styles.menuItem}>ANA SAYFA</Link>
            </Menu.Item>
            <Menu.Item key="hizmetler">
              <Link to="/hizmetler" style={styles.menuItem}>HİZMETLERİMİZ</Link>
            </Menu.Item>
            <Menu.Item key="kaydol">
              <Link to="/kaydol" style={styles.menuItem}>KAYIT OL</Link>
            </Menu.Item>
            <Menu.Item key="giris">
              <Link to="/giris" style={styles.menuItem}>GİRİŞ YAP</Link>
            </Menu.Item>
            {/* İşletme sayfasında işletme girişini göstermiyoruz */}
            {!isIsletmePage && (
              <Menu.Item key="isletme">
                <Link to="/isletme" style={styles.menuItem}>
                  <img src={isletmeLogo} alt="İşletme Logo" style={styles.isletmeLogo} />
                  İŞLETME GİRİŞİ
                </Link>
              </Menu.Item>
            )}
          </>
        )}
      </Menu>
    </nav>
  );
};

// Stiller (Aynı şekilde koruduk)
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