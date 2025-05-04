import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Form, Input, Button, message } from "antd";
import "../styles/Isletme.css";
import foto from "../assets/isletmeler.png";
import googleicon from "../assets/googleicon.png";
import facebookicon from "../assets/facebookicon.png";
import appleicon from "../assets/appleicon.png";
import Footer from "../components/Footer";
import axios from "axios";

const Isletme = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleRegister = async (values) => {
    const { email, password } = values;
  
    const dto = {
      email,
      password,
      fullName: "",
      businessName: "",
      phone: "",
      address: ""
    };
  
    try {
      const response = await axios.post(
        "https://localhost:7263/register/business",
        dto,
        { withCredentials: true }
      );
  
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
      }
  
      else if (data?.errors && typeof data.errors === "object") {
        Object.values(data.errors).flat().forEach((msg) => message.error(msg));
      }
  
      else {
        message.error("Kayıt sırasında bir hata oluştu.");
      }
    }
  };

  const handleLogin = async (values) => {
    const { email, password } = values;

    try {
      const response = await axios.post(
        "https://localhost:7263/login/business",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        localStorage.setItem("userType", "business");
        message.success("Giriş başarılı!");
        navigate("/isletme-giris");
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
        {/* KAYIT FORMU */}
        <div className="form-inner front">
          <h2>İşletme Kaydı</h2>
          <Form name="register" layout="vertical" onFinish={handleRegister}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: "email", message: "Geçerli bir email girin!" }]}
            >
              <Input placeholder="Email adresiniz" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Şifre"
              rules={[{ required: true, min: 6, message: "Şifre en az 6 karakter olmalı!" }]}
            >
              <Input.Password placeholder="Şifreniz" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Şifreyi Onayla"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Şifreyi onaylayın!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    return !value || getFieldValue("password") === value
                      ? Promise.resolve()
                      : Promise.reject("Şifreler eşleşmiyor!");
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Şifrenizi tekrar girin" />
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

        {/* GİRİŞ FORMU */}
        <div className="form-inner back">
          <h2>İşletme Girişi</h2>
          <Form name="login" className="login-form" layout="vertical" onFinish={handleLogin}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Email zorunludur!" }]}
            >
              <Input placeholder="Email adresiniz" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Şifre"
              rules={[{ required: true, message: "Şifre zorunludur!" }]}
            >
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
