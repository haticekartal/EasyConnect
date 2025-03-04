import React from "react";
import { Card, Form, Input, Button, Checkbox } from "antd";
import { GoogleOutlined, AppleOutlined, FacebookOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../styles/Giris.css";
import Navbar from "../components/Navbar";

const Giris = () => {
  return (
    <div className="giris-container">
      <Navbar />
      <div className="giris-content">
        <div className="giris-image"></div>
        <div className="giris-form-container">
          <Card className="giris-form-card">
            <h2>Giriş Yap</h2>
            <p>Randevunuzu size en uygun şekilde seçin ve konforun tadını çıkarın.</p>
            <Form layout="vertical">
              <Form.Item label="Email" name="email">
                <Input type="email" placeholder="haticekartal@example.com" />
              </Form.Item>
              <Form.Item label="Şifre" name="password">
                <Input.Password placeholder="************" />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked" className="remember-me">
                <Checkbox>Beni Hatırla</Checkbox>
                <a href="#" className="forgot-password">Şifremi Unuttum</a>
              </Form.Item>
              <Form.Item>
                <Button type="primary" block className="proceed-button">
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