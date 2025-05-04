import React, { useState } from "react";
import { Form, Input, Button, Select, Upload, Card, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import "../styles/İşletmeGiriş.css";
import axios from "axios";

const { Option } = Select;

const IsletmeGiris = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = async (values) => {
    const dto = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      businessName: values.isletmeAdi,
      phone: values.phone,
      address: values.address
    };

    try {
      const response = await axios.post("https://localhost:7263/register/business", dto, {
        withCredentials: true
      });

      if (response.status === 200) {
        message.success("İşletme hesabı başarıyla oluşturuldu!");
        form.resetFields();
        setFileList([]);
      } else {
        message.error("Kayıt başarısız.");
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        const errors = Object.values(err.response.data.errors).flat();
        errors.forEach(e => message.error(e));
      } else {
        message.error("Sunucu hatası oluştu.");
      }
    }
  };

  return (
    <div className="isletme-giris-container">
      <Navbar />
      <Card className="form-card">
        <h2 className="form-title">İşletme Kaydı</h2>
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="isletme-form">

          <Form.Item label="Ad Soyad" name="fullName" rules={[{ required: true }]}>
            <Input placeholder="Adınızı Soyadınızı Girin" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input placeholder="Email Adresi" />
          </Form.Item>

          <Form.Item label="Şifre" name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Şifre" />
          </Form.Item>

          <Form.Item label="İşletme Adı" name="isletmeAdi" rules={[{ required: true }]}>
            <Input placeholder="İşletme Adı" />
          </Form.Item>

          <Form.Item label="Telefon" name="phone" rules={[{ required: true }]}>
            <Input placeholder="İletişim Numarası" />
          </Form.Item>

          <Form.Item label="Adres" name="address" rules={[{ required: true }]}>
            <Input placeholder="Adres" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="kaydet-button">Kaydet</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default IsletmeGiris;
