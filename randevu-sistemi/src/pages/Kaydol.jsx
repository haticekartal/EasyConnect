import React from "react";
import { Card, Form, Input, Button, Checkbox } from "antd";
import { GoogleOutlined, AppleOutlined, FacebookOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../styles/Kaydol.css";
import Navbar from "../components/Navbar";

const Kaydol = () => {
  return (
    <div className="kaydol-container">
      <Navbar />
      <div className="kaydol-content">
        <div className="kaydol-form-container">
          <Card className="kaydol-form-card">
            <h2>Kaydol</h2>
            <p>Hızlıca bir hesap oluşturun ve başlamak için kaydolun.</p>
            <Form layout="vertical">
              <Form.Item label="İsim" name="fullname">
                <Input placeholder="Adınızı ve soyadınızı girin" />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input type="email" placeholder="haticekartal@example.com" />
              </Form.Item>
              <Form.Item label="Şifre" name="password">
                <Input.Password placeholder="************" />
              </Form.Item>
              <Form.Item name="agreement" valuePropName="checked" className="remember-me">
                <Checkbox>Beni Hatırla</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button type="primary" block className="proceed-button">
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