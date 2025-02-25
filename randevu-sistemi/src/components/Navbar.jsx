import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import easyconnectLogo from "../assets/easyconnectlogo.svg"; // Logoyu içe aktar
import isletmeLogo from "../assets/isletmelogo.png"; // İşletme logosunu içe aktar

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <Link to="/" style={styles.logoContainer}>
       <img src={easyconnectLogo} alt="EasyConnect Logo" style={styles.logo} />
      </Link>

      {/* Menü */}
      <Menu mode="horizontal" style={styles.menu}>
        <Menu.Item key="home">
          <Link to="/" style={styles.menuItem}>ANA SAYFA</Link>
        </Menu.Item>
        <Menu.Item key="hizmetler">
          <Link to="/hizmetler" style={styles.menuItem}>HİZMETLERİMİZ</Link>
        </Menu.Item>
        <Menu.Item key="paketler">
          <Link to="/paketler" style={styles.menuItem}>PAKETLERİMİZ</Link>
        </Menu.Item>
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
      </Menu>
    </nav>
  );
};

// Stiller
const styles = {
  navbar: {
    position: "fixed", // Navbar'ı sabitler
    top: 0, // En üstte
    left: 0, // Sol taraf
    width: "100%", // Yatay olarak tam genişlik
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    zIndex: 1000, // Diğer öğelerin üstünde görünmesini sağlar
    backgroundColor: "#283646",
    borderBottom: "none", // Beyaz çizgiyi kaldırdık
  },
  logoContainer: {
    textDecoration: "none",
  },
  logo: {
    height: "50px", // Logonun boyutunu ayarlayabilirsiniz
  },
  menu: {
    flex: 1,
    display: "flex", // Menü elemanlarının yatay olmasını sağlar
    justifyContent: "flex-end", // Menü öğelerini sağa hizalar
    backgroundColor: "transparent",
    borderBottom: "none",
  },
  menuItem: {
    color: "white", // Yazı rengini beyaz yapıyoruz
    fontFamily: "'Crimson Text', serif", // Font stilini Crimson Text yapıyoruz
  },
  isletmeLogo: {
    height: "20px", // İşletme logosunun boyutunu ayarlayın
    marginRight: "8px", // Logo ile yazı arasına boşluk ekleyin
  },
};

export default Navbar;