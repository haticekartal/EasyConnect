import React, { useState } from "react";
import { Card, Form, Input, Button, Checkbox, Alert } from "antd";
import { GoogleOutlined, AppleOutlined, FacebookOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Giris.css";
import Navbar from "../components/Navbar";

const Giris = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5160/login/customer",
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true, // 🍪 Cookie tabanlı auth
        }
      );

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("userId", response.data.userId); // ✅ userId'yi ayrı da sakla
        navigate("/");
      }

    } catch (err) {
      if (err.response?.status === 401) {
        setError("Email veya şifre hatalı.");
      } else {
        setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };


  return (
    <div className="giris-container">
      <Navbar />
      <div className="giris-content">
        <div className="giris-image"></div>
        <div className="giris-form-container">
          <Card className="giris-form-card">
            <h2>Giriş Yap</h2>
            <p>Randevunuzu size en uygun şekilde seçin ve konforun tadını çıkarın.</p>

            {error && (
              <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />
            )}

            <Form form={form} layout="vertical" onFinish={handleLogin}>
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

              <Form.Item name="remember" valuePropName="checked" className="remember-me">
                <Checkbox>Beni Hatırla</Checkbox>
                <a href="#" className="forgot-password">Şifremi Unuttum</a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block className="proceed-button">
                  Giriş Yap
                </Button>
              </Form.Item>
            </Form>

            <p className="or-text">Ya da</p>
            <div className="social-buttons">
              <Button shape="circle" icon={<GoogleOutlined />} />
              <Button shape="circle" icon={<AppleOutlined />} />
              <Button shape="circle" icon={<FacebookOutlined />} />
            </div>

            <p className="signup-text">
              Hesabınız yok mu? <Link to="/kaydol" className="signup-link">Kaydolun</Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Giris;
