import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Form, Input, Button, message, Card, Spin } from "antd";
import "../styles/Isletme.css";
import foto from "../assets/isletmeler.png";
import googleicon from "../assets/googleicon.png";
import facebookicon from "../assets/facebookicon.png";
import appleicon from "../assets/appleicon.png";
import Footer from "../components/Footer";
import axios from "axios";

const Isletme = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleRegister = async (values) => {
    const { email, password, fullName, businessName, phone, address } = values;
    const dto = { email, password, fullName, businessName, phone, address };

    try {
      const response = await axios.post("http://localhost:5160/register/business", dto);
      if (response.status === 200) {
        message.success("Kayıt başarılı, şimdi giriş yapabilirsiniz.");
        setIsFlipped(true);
      }
    } catch (error) {
      const data = error.response?.data;
      if (Array.isArray(data)) {
        data.forEach((err) => {
          const msg = err?.description || err?.code || "Bilinmeyen bir hata oluştu.";
          message.error(msg);
        });
      } else if (data?.errors && typeof data.errors === "object") {
        Object.values(data.errors).flat().forEach((msg) => message.error(msg));
      } else {
        message.error("Kayıt sırasında bir hata oluştu.");
      }
    }
  };

  const handleLogin = async (values) => {
    const { email, password } = values;
    try {
      const response = await axios.post("http://localhost:5160/login/business", { email, password });
      if (response.status === 200) {
        console.log(response)
        const business = response.data;
        localStorage.setItem("business", JSON.stringify(business));
        localStorage.setItem("userId", business.userId); // ✅ Bunu ekle
        message.success("Giriş başarılı!");
        navigate("/");
      }

    } catch (error) {
      const data = error.response?.data;
      if (data?.errors && typeof data.errors === "object") {
        Object.values(data.errors).flat().forEach((msg) => message.error(msg));
      } else if (Array.isArray(data)) {
        data.forEach((err) =>
          message.error(err?.description || "Bilinmeyen bir hata oluştu.")
        );
      } else {
        message.error("Email veya şifre hatalı!");
      }
    }
  };


  return (
    <div className="isletme-container">
      <Navbar />
      <div className="isletme-image-container">
        <img src={foto} alt="İşletme" className="isletme-image" />
      </div>

      <div className={`form-container ${isFlipped ? "flip" : ""}`}>
        <div className="form-inner front">
          <h2>İşletme Kaydı</h2>
          <Form name="register" layout="vertical" onFinish={handleRegister}>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
              <Input placeholder="Email adresiniz" />
            </Form.Item>
            <Form.Item name="password" label="Şifre" rules={[{ required: true, min: 6 }]}>
              <Input.Password placeholder="Şifreniz" />
            </Form.Item>
            <Form.Item name="fullName" label="Ad Soyad" rules={[{ required: true }]}>
              <Input placeholder="Adınız ve Soyadınız" />
            </Form.Item>
            <Form.Item name="businessName" label="İşletme Adı" rules={[{ required: true }]}>
              <Input placeholder="İşletmenizin adı" />
            </Form.Item>
            <Form.Item name="phone" label="Telefon" rules={[{ required: true }]}>
              <Input placeholder="Telefon numaranız" />
            </Form.Item>
            <Form.Item name="address" label="Adres" rules={[{ required: true }]}>
              <Input placeholder="Adresiniz" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="register-form-button">
                Kayıt Ol
              </Button>
            </Form.Item>
          </Form>

          <div className="social-media">
            <p>Sosyal Medya ile Giriş Yap</p>
            <div className="social-icons">
              <img src={facebookicon} alt="Facebook" className="social-icon" />
              <img src={googleicon} alt="Google" className="social-icon" />
              <img src={appleicon} alt="Apple" className="social-icon" />
            </div>
          </div>
          <div className="switch-form">
            <p>Zaten hesabınız var mı? <a onClick={handleFlip}>Giriş Yapın</a></p>
          </div>
        </div>

        <div className="form-inner back">
          <h2>İşletme Girişi</h2>
          <Form name="login" className="login-form" layout="vertical" onFinish={handleLogin}>
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
              <Input placeholder="Email adresiniz" />
            </Form.Item>
            <Form.Item name="password" label="Şifre" rules={[{ required: true }]}>
              <Input.Password placeholder="Şifreniz" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="register-form-button">
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>

          <div className="social-media">
            <p>Sosyal Medya ile Giriş Yap</p>
            <div className="social-icons">
              <img src={facebookicon} alt="Facebook" className="social-icon" />
              <img src={googleicon} alt="Google" className="social-icon" />
              <img src={appleicon} alt="Apple" className="social-icon" />
            </div>
          </div>
          <div className="switch-form">
            <p>Hesabınız yok mu? <a onClick={handleFlip}>Kayıt Olun</a></p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Isletme;
