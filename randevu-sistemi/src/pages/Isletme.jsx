import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Form, Input, Button } from "antd";
import "../styles/Isletme.css";
import foto from "../assets/isletmeler.png";
import googleicon from "../assets/googleicon.png";
import facebookicon from "../assets/facebookicon.png";
import appleicon from "../assets/appleicon.png";
import { CheckCircleOutlined } from "@ant-design/icons";
import Footer from "../components/Footer";

const Isletme = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const onFinish = (values) => {
    const { email, password } = values;

    // Statik kullanıcı kontrolü, backend bağlandığında API isteği yapılabilir
    if (email === "haticekartal" && password === "1234") {
      navigate("/isletme-giris");
    } else {
      alert("Geçersiz email veya şifre!");
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
          <h2>Kayıt Ol</h2>
          <Form name="register" className="register-form" layout="vertical">
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Lütfen geçerli bir email adresi girin!",
                  type: "email",
                },
              ]}
            >
              <Input placeholder="Email adresiniz" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Şifre Oluştur"
              rules={[
                {
                  required: true,
                  message: "Lütfen şifrenizi oluşturun!",
                  min: 6,
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Şifreniz" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Şifreyi Onayla"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Şifrenizi onaylayın!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Şifreler eşleşmiyor!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Şifrenizi onaylayın" />
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
            <p>
              Zaten hesabınız var mı?{" "}
              <a onClick={handleFlip}>Giriş Yapın</a>
            </p>
          </div>
        </div>

        <div className="form-inner back">
          <h2>Giriş Yap</h2>
          <Form name="login" className="login-form" layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Lütfen email adresinizi girin!",
                },
              ]}
            >
              <Input placeholder="Email adresiniz" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Şifre"
              rules={[
                {
                  required: true,
                  message: "Lütfen şifrenizi girin!",
                },
              ]}
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
            <p>
              Hesabınız yok mu?{" "}
              <a onClick={handleFlip}>Kayıt Olun</a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Isletme;