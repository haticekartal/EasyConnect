import React from "react";
import { MailOutlined, CalendarOutlined, SafetyCertificateOutlined, MessageOutlined, ClockCircleOutlined } from "@ant-design/icons"; // Gerekli ikonları import ettik
import "../styles/Footer.css";
import easyconnectLogo from "../assets/easyconnectlogo.svg";

const Footer = () => {
  return (
    <div className="footer">
      {/* Logo */}
      <img src={easyconnectLogo} alt="EasyConnect Logo" />

      {/* İkonlar */}
      <div className="footer-icons">
        <div className="footer-icon">
          <MailOutlined style={{ fontSize: "30px", color: "white", marginBottom: "10px" }} />
          <p>Hizmetler</p>
        </div>
        <div className="footer-icon">
          <CalendarOutlined style={{ fontSize: "30px", color: "white", marginBottom: "10px" }} />
          <p>Yardım</p>
        </div>
        <div className="footer-icon">
          <SafetyCertificateOutlined style={{ fontSize: "30px", color: "white", marginBottom: "10px" }} />
          <p>Bize Ulaşın</p>
        </div>
        <div className="footer-icon">
          <MessageOutlined style={{ fontSize: "30px", color: "white", marginBottom: "10px" }} />
          <p>Bize Katılın</p>
        </div>
        <div className="footer-icon">
          <ClockCircleOutlined style={{ fontSize: "30px", color: "white", marginBottom: "10px" }} />
          <p>Çalışma Saatleri</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;