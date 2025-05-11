import React, { useState } from "react";
import { Card, Form, Input, Button, Checkbox, Alert } from "antd";
import { GoogleOutlined, AppleOutlined, FacebookOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Kaydol.css";
import Navbar from "../components/Navbar";

const Kaydol = () => {
  const [form] = Form.useForm();
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    setErrors([]);
    setSuccessMessage("");

    const payload = {
      email: values.email,
      password: values.password,
      fullName: values.fullName
    };

    try {
      const response = await axios.post("http://localhost:5160/register/customer", payload, { withCredentials: true });
      if (response.status === 200) {
        setSuccessMessage("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
        setTimeout(() => {
          navigate("/giris");
        }, 2000);
      } else {
        setErrors(["Beklenmeyen bir yanıt alındı. Lütfen tekrar deneyin."]);
      }
    } catch (error) {
      if (Array.isArray(error.response?.data)) {
        // Eğer doğrudan array dönerse
        const backendErrors = error.response.data.map((e) => e.description || "Hata oluştu.");
        setErrors(backendErrors);
      } else if (error.response?.data?.errors) {
        // Eğer error objesi varsa
        const backendErrors = Object.values(error.response.data.errors).flat();
        setErrors(backendErrors);
      } else {
        setErrors(["Bilinmeyen bir hata oluştu."]);
      }
    }
  };

  return (
    <div className="kaydol-container">
      <Navbar />
      <div className="kaydol-content">
        <div className="kaydol-form-container">
          <Card className="kaydol-form-card">
            <h2>Kaydol</h2>
            <p>Hızlıca bir hesap oluşturun ve başlamak için kaydolun.</p>

            {successMessage && (
              <Alert message={successMessage} type="success" showIcon style={{ marginBottom: 16 }} />
            )}

            {errors.length > 0 && (
              <Alert
                message="Kayıt sırasında hatalar oluştu:"
                description={
                  <ul>
                    {errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                }
                type="error"
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}

            <Form form={form} layout="vertical" onFinish={handleRegister}>
              <Form.Item
                label="Ad Soyad"
                name="fullName"
                rules={[{ required: true, message: "Ad soyad zorunludur" }]}
              >
                <Input placeholder="Adınızı ve soyadınızı girin" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Email zorunludur" }]}
              >
                <Input type="email" placeholder="ornek@example.com" />
              </Form.Item>

              <Form.Item
                label="Şifre"
                name="password"
                rules={[{ required: true, message: "Şifre zorunludur" }]}
              >
                <Input.Password placeholder="************" />
              </Form.Item>

              <Form.Item name="agreement" valuePropName="checked" className="remember-me">
                <Checkbox>Beni Hatırla</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block className="proceed-button">
                  Kaydol
                </Button>
              </Form.Item>
            </Form>

            <p className="or-text">Ya da</p>
            <div className="social-buttons">
              <Button shape="circle" icon={<GoogleOutlined />} />
              <Button shape="circle" icon={<AppleOutlined />} />
              <Button shape="circle" icon={<FacebookOutlined />} />
            </div>

            <p className="login-text">
              Hesabınız var mı? <Link to="/giris" className="login-link">Giriş yapın</Link>
            </p>
          </Card>
        </div>
        <div className="kaydol-image"></div>
      </div>
    </div>
  );
};

export default Kaydol;
