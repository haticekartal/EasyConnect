import React, { useState } from "react";
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

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="isletme-container">
      <Navbar /> 

      <div className="isletme-image-container">
        <img src={foto} alt="İşletme" className="isletme-image" />
      </div>

      {/* Form Alanı */}
      <div className={`form-container ${isFlipped ? "flip" : ""}`}>
        {/* Kayıt Ol Formu */}
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

          {/* Sosyal Medya Giriş Seçenekleri */}
          <div className="social-media">
            <p>Sosyal Medya ile Giriş Yap</p>
            <div className="social-icons">
              <img src={facebookicon} alt="Facebook" className="social-icon" />
              <img src={googleicon} alt="Google" className="social-icon" />
              <img src={appleicon} alt="Apple" className="social-icon" />
            </div>
          </div>

          {/* Giriş Yap Linki */}
          <div className="switch-form">
            <p>
              Zaten hesabınız var mı?{" "}
              <a onClick={handleFlip}>Giriş Yapın</a>
            </p>
          </div>
        </div>

        {/* Giriş Yap Formu */}
        <div className="form-inner back">
          <h2>Giriş Yap</h2>
          <Form name="login" className="login-form" layout="vertical">
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Lütfen email adresinizi girin!",
                  type: "email",
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

          {/* Sosyal Medya Giriş Seçenekleri */}
          <div className="social-media">
            <p>Sosyal Medya ile Giriş Yap</p>
            <div className="social-icons">
              <img src={facebookicon} alt="Facebook" className="social-icon" />
              <img src={googleicon} alt="Google" className="social-icon" />
              <img src={appleicon} alt="Apple" className="social-icon" />
            </div>
          </div>

          {/* Kayıt Ol Linki */}
          <div className="switch-form">
            <p>
              Hesabınız yok mu?{" "}
              <a onClick={handleFlip}>Kayıt Olun</a>
            </p>
          </div>
        </div>
      </div>

      {/* Paketler Bölümü */}
      <div className="paket-container">
        <div className="paket-card">
          <div className="paket-header">
            <h2>STANDART</h2>
            <p className="price">1200 TL</p>
            <p className="payment-method">aylık ödeme yöntemi</p>
          </div>
          <div className="paket-features">
            <div className="feature">
              <CheckCircleOutlined className="check-icon" />
              <span>Randevu Yönetimi</span>
            </div>
            <div className="feature">
              <CheckCircleOutlined className="check-icon" />
              <span>Müşteri Takibi</span>
            </div>
            <div className="feature">
              <CheckCircleOutlined className="check-icon" />
              <span>Online Randevu Sistemi</span>
            </div>
            <div className="feature">
              <CheckCircleOutlined className="check-icon" />
              <span>Sınırsız Randevu</span>
            </div>
            <div className="feature">
              <CheckCircleOutlined className="check-icon" />
              <span>Memnuniyet Anketi</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Isletme;